var sinon = require('sinon')
var BPromise = require('bluebird')

// Create resolves function
function resolves (value) {
  return this.returns(BPromise.resolve(value))
}

// Attach resolves function to sinon
sinon.stub.resolves = sinon.behavior.resolves = resolves

// Create a Bluebird Promise wrapper class to avoid unnecessary
// "possibly unhandled exception" warnings
function RejectBPromise (value) {
  this.value = value
}

// Go through all Bluebird and wrap each method on the new RejectBPromise class
Object.keys(BPromise.prototype).map(function (key) {
  RejectBPromise.prototype[key] = function () {
    var prom = BPromise.reject(this.value)
    return prom[key].apply(prom, arguments)
  }
})

// Create the rejects function
function rejects (value) {
  this.rejectBPromise = true
  return this.returns(new RejectBPromise(value))
}

// Attach rejects function to sinon
sinon.stub.rejects = sinon.behavior.rejects = rejects

// Special getCall method that checks for existence of promises in return value and args.
// If found, then unwraps them using their value in place of the promise
sinon.spy.getPromiseCall = function (i) {
  if (i < 0 || i >= this.callCount) {
    return null
  }

  // Check for and unwrap args values that are promises
  var argVals = this.args[i]
  for (var prop in argVals) {
    if (argVals[prop] &&
      typeof argVals[prop].isFulfilled === 'function') {
      if (argVals[prop].isFulfilled()) {
        argVals[prop] = argVals[prop].value()
      } else if (argVals[prop].isRejected()) {
        argVals[prop] = argVals[prop].reason()
      }
    }
  }

  // Check for and unwrap the return value if it's a promise
  var returnVal = this.returnValues[i]
  if (returnVal && typeof returnVal.isFulfilled === 'function') {
    if (returnVal.isFulfilled()) {
      returnVal = returnVal.value()
    } else if (returnVal.isRejected()) {
      returnVal = returnVal.reason()
    } else {
      throw new Error('Promise not resolved yet')
    }
  }

  return sinon.spyCall(this, this.thisValues[i], argVals,
    returnVal, this.exceptions[i],
    this.callIds[i])
}

// Almost identical to internal method except it calls a special getCall method
sinon.spy.delegateToCallsPromise = function (method, matchAny, actual, notCalled) {
  this[method] = function () {
    if (!this.called) {
      if (notCalled) {
        return notCalled.apply(this, arguments)
      }
      return false
    }

    var currentCall
    var matches = 0

    for (var i = 0, l = this.callCount; i < l; i += 1) {
      currentCall = this.getPromiseCall(i) // Call the special promise getCall method

      if (currentCall[actual || method].apply(currentCall, arguments)) {
        matches += 1

        if (matchAny) {
          return true
        }
      }
    }

    return matches === this.callCount
  }
}

// return methods
sinon.spy.delegateToCallsPromise('returnedPromise', true, 'returned')
sinon.spy.delegateToCallsPromise('alwaysReturnedPromise', false, 'returned')

// param methods
sinon.spy.delegateToCallsPromise('calledWithPromise', true, 'calledWith')
sinon.spy.delegateToCallsPromise('calledWithMatchPromise', true, 'calledWithMatch')
sinon.spy.delegateToCallsPromise('alwaysCalledWithPromise', false, 'calledWith')
sinon.spy.delegateToCallsPromise('alwaysCalledWithMatchPromise', false, 'calledWithMatch')
sinon.spy.delegateToCallsPromise('calledWithExactlyPromise', true, 'calledWithExactly')
sinon.spy.delegateToCallsPromise('alwaysCalledWithExactlyPromise', false, 'calledWithExactly')

// Export Sinon
module.exports = exports = sinon

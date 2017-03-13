/**
 * AWMController - A Base controller with utility methods
 * Mainly used to validate auth, define a default JSON response structor and helper methods, etc
 *
 * @param {http.IncomingMessage}  req
 * @param {http.ServerResponse}   res
 *
 * @returns {AWMController}
 * */
class AWMController {

	constructor(req,res){

		/**
		 * request - {http.IncomingMessage}
		 * */
		this._request = req;

		/**
		 * response - Express response Object
		 * */
		this._response = res;

		/**
		 * defaultMessages {Dictionary} - default textual messages for commonly used response codes
		 * */
		this._defaultMessages = {
			100: "Continue",
			101: "Switching Protocols",
			200: "OK",
			201: "Created",
			202: "Accepted",
			400: "Bed Request",
			401: "Unauthorized",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed"
		}


	}

	/**
	 * getDefaultMessageForCode
	 *
	 * @param {Integer} code
	 * @return {String} Default HTTP Status code description
	 * */
	getDefaultMessageForCode(code) {
		if (this._defaultMessages.hasOwnProperty(code)) { return this._defaultMessages[code]; }
		else return "";
	}

	/**
	 * request
	 * @rertuns {http.request}
	 * */
	request(){
		return this._request;
	}

	/**
	 * response
	 * @returns {http.response}
	 * */
	response(){
		return this._response;
	}



	/**
	 * reply - a utility function to define a default JSON response structure
	 *
	 * @param {Integer}       code - an HTTP response code
	 * @param {<Any Object>}  data - A response payload
	 * @param {String}        msg  - An optional message string
	 * */
	reply(code,data,msg){

		if (!code) throw new Error(this.constructor.name + " response must contain a status code");
		if (!data) data = {};
		if (!msg)  msg = this.getDefaultMessageForCode(code);

		return this._response.status(code).json(
			{
				code: code,
				data: data,
				msg:  msg
			}
		);
	}


}

module.exports = AWMController;

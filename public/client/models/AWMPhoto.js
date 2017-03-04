/**
 * AWM.Photo
 *
 * An Object wrapping Asana User photo dictionary
 *
 * */
AWM.Photo = function(){

	/**
	 * 21x21 image url
	 * */
	this.xs = null;

	/**
	 * 27x27 image url
	 * */
	this.s = null;

	/**
	 * 36x36 image url
	 * */
	this.m = null;

	/**
	 * 60x60 image url
	 * */
	this.l = null;

	/**
	 * 128x128 image url
	 * */
	this.xl = null;

};


/**
 * get - returns the value of a specific image size
 *
 * @param {String} size - allowed values are "xs", "s", "m" , "l", "xl"
 * @returns {String} image url
 * */
AWM.Photo.prototype.get = function(size){
	if (this.hasOwnProperty(size)) return this[size];
	else return null;
};

/**
 * set - assigns a url to a specific image size
 *
 * @param {String} size - allowed values are "xs", "s", "m" , "l", "xl"
 * @param {String} url - image full URL
 * @returns {AWM.Photo}
 * */
AWM.Photo.prototype.set = function(size,url){
	if (this.hasOwnProperty(size)) this[size] = url;
	else throw new Error(`AWM.Photo - unable to set url for size: {size}. No such size.`);

	return this;
};

/**
 * initFromPayload - a helper method to set all instance properties directly from Asana response photo payload, as returned by the /me endpoint
 *
 * @param {Dictionary} payload - expected format:
 * {
 *    image_21x21: "<img url",
 *    image_27x27: ...,
 *    image_36x36: ...,
 *    image_60x60: ...,
 *    image_128x128: ...
 * }
 *
 * @returns {AWM.Photo}
 *
 * */
AWM.Photo.prototype.initFromPayload = function(payload){

	this.set('xs',payload['image_21x21']);
	this.set('s',payload['image_27x27']);
	this.set('m',payload['image_36x36']);
	this.set('l',payload['image_60x60']);
	this.set('xl',payload['image_128x128']);

	return this;
};

/**
 * camelCaseController
 *
 * This is an example/boiler plate. all files in the controllers folder are requires and expected to turn into routes
 * A file name spelled with camelCase will be made available at <path>/camel-case-file-name>
 * */

/**
 * Get a new instance of the express router
 * */
const router = require('express').Router();

/**
 * Assign all available routes to the router
 * */
router.get('/', function(req,res){
	res.status(200).json({ message: 'Dummy data' })
});

router.get('/:id',function(req,res){
	const resourceId = req.params.id
	res.status(200).json({resourceId:resourceId});
});

/**
 * module.exports - Exports the new sub-router with all of it's routes
 * */
module.exports = router;
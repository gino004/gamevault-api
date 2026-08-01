const express = require("express");
const router = express.Router();

const studioController = require("../controllers/studios");
const validation = require("../middleware/validate");
const auth = require("../middleware/authenticate");


/**
	* #swagger.tags = ['Studios']
	* #swagger.summary = 'Get all studios'
	*/
router.get("/", studioController.getAll);

/**
	* #swagger.tags = ['Studios']
	* #swagger.summary = 'Get a studio by ID'
	*/
router.get("/:id", studioController.getSingle);

/**
	* #swagger.tags = ['Studios']
	* #swagger.summary = 'Create a new studio'
	*/
router.post("/", auth.isAuthenticated, validation.saveStudio, studioController.createStudio);

/**
	* #swagger.tags = ['Studios']
	* #swagger.summary = 'Update an existing studio'
	*/
router.put("/:id", auth.isAuthenticated, validation.saveStudio, studioController.updateStudio);

/**
	* #swagger.tags = ['Studios']
	* #swagger.summary = 'Delete a studio'
	*/
router.delete("/:id", auth.isAuthenticated, studioController.deleteStudio);

module.exports = router;
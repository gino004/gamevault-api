const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/games");
const validation = require("../middleware/validate");


/**
	* #swagger.tags = ['Games']
	* #swagger.summary = 'Get all games'
	*/
router.get("/", gamesController.getAll);

/**
	* #swagger.tags = ['Games']
	* #swagger.summary = 'Get a game by ID'
	*/
router.get("/:id", gamesController.getSingle);

/**
	* #swagger.tags = ['Games']
	* #swagger.summary = 'Create a new game'
	*/
router.post("/", validation.saveGame, gamesController.createGame);

/**
	* #swagger.tags = ['Games']
	* #swagger.summary = 'Update an existing game'
	*/
router.put("/:id", validation.saveGame, gamesController.updateGame);

/**
	* #swagger.tags = ['Games']
	* #swagger.summary = 'Delete a game'
	*/
router.delete("/:id", gamesController.deleteGame);

module.exports = router;
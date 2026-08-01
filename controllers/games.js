const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
	try {
		const result = await mongodb
			.getDatabase()
			.collection("games")
			.find();

		const games = await result.toArray();

		res.setHeader("Content-Type", "application/json");
		res.status(200).json(games);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

const getSingle = async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id)) {
			return res.status(400).json({
				message: "Invalid contact ID"
			});
		}
		const gameID = new ObjectId(req.params.id);

		const result = await mongodb
			.getDatabase()
			.collection("games")
			.findOne({ _id: gameID });

		if (!result) {
			return res.status(404).json({
				message: "Game not found"
			});
		}

		res.status(200).json(result);

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

const createGame = async (req, res) => {
	try {

		const game = {
			title: req.body.title,
			genre: req.body.genre,
			platform: req.body.platform,
			developer: req.body.developer,
			releaseYear: req.body.releaseYear,
			price: req.body.price,
			rating: req.body.rating,
			coverImage: req.body.coverImage
		};

		const response = await mongodb
			.getDatabase()
			.collection("games")
			.insertOne(game);

		if (response.acknowledged) {
			res.status(201).json({
				id: response.insertedId
			});
		} else {
			res.status(500).json({
				message: "Failed to create game."
			});
		}

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

const updateGame = async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id)) {
			return res.status(400).json({
				message: "Invalid game ID"
			});
		}
		const gameID = new ObjectId(req.params.id);

		const game = {
			title: req.body.title,
			genre: req.body.genre,
			platform: req.body.platform,
			developer: req.body.developer,
			releaseYear: req.body.releaseYear,
			price: req.body.price,
			rating: req.body.rating,
			coverImage: req.body.coverImage
		};

		const response = await mongodb
			.getDatabase()
			.collection("games")
			.replaceOne(
				{ _id: gameID },
				game
			);

		if (response.matchedCount === 0) {
			return res.status(404).json({
				message: "Game not found"
			});
		}
		res.status(204).send();

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

const deleteGame = async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id)) {
			return res.status(400).json({
				message: "Invalid game ID"
			});
		}
		const gameID = new ObjectId(req.params.id);

		const response = await mongodb
			.getDatabase()
			.collection("games")
			.deleteOne({ _id: gameID });

		if (response.deletedCount === 0) {
			return res.status(404).json({
				message: "Game not found"
			});
		}
		res.status(204).send();

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

module.exports = {
	getAll,
	getSingle,
	createGame,
	updateGame,
	deleteGame
};
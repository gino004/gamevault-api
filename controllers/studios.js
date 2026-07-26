const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
	try {
		const result = await mongodb
			.getDatabase()
			.collection("studios")
			.find();

		const studios = await result.toArray();

		res.setHeader("Content-Type", "application/json");
		res.status(200).json(studios);
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
				message: "Invalid studio ID"
			});
		}
		const studioID = new ObjectId(req.params.id);

		const result = await mongodb
			.getDatabase()
			.collection("studios")
			.findOne({ _id: studioID });

		if (!result) {
			return res.status(404).json({
				message: "Studio not found"
			});
		}

		res.status(200).json(result);

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

const createStudio = async (req, res) => {
	try {

		const studio = {
			name: req.body.name,
			foundedYear: req.body.foundedYear,
			 headquarters: req.body.headquarters,
			website: req.body.website
		};

		const response = await mongodb
			.getDatabase()
			.collection("studios")
			.insertOne(studio);

		if (response.acknowledged) {
			res.status(201).json({
				id: response.insertedId
			});
		} else {
			res.status(500).json({
				message: "Failed to create studio."
			});
		}

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};
			
const updateStudio = async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id)) {
			return res.status(400).json({
				message: "Invalid studio ID"
			});
		}
		const studioID = new ObjectId(req.params.id);

		const studio = {
			name: req.body.name,
			foundedYear: req.body.foundedYear,
			headquarters: req.body.headquarters,
			website: req.body.website
		};

		const response = await mongodb
			.getDatabase()
			.collection("studios")
			.replaceOne(
				{ _id: studioID },
				studio
			);

		if (response.matchedCount === 0) {
			return res.status(404).json({
				message: "Studio not found"
			});
		}
		res.status(204).send();

	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
};

		
const deleteStudio = async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.id)) {
			return res.status(400).json({
				message: "Invalid studio ID"
			});
		}
		const studioID = new ObjectId(req.params.id);

		const response = await mongodb
			.getDatabase()
			.collection("studios")
			.deleteOne({ _id: studioID });

		if (response.deletedCount === 0) {
			return res.status(404).json({
				message: "Studio not found"
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
	createStudio,
	updateStudio,
	deleteStudio
};
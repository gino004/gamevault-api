const validator = require("../helpers/validate");

const saveGame = (req, res, next) => {
	const validationRule = {
		title: "required|string",
		genre: "required|string",
		platform: "required|string",
		developer: "required|string",
		releaseYear: "required|integer",
		price: "required|numeric",
		rating: "required|numeric",
		coverImage: "required|string"
	};

	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err
			});
		} else {
			next();
		}
	});
};

const saveStudio = (req, res, next) => {
	const validationRule = {
		name: "required|string",
		foundedYear: "required|integer",
		headquarters: "required|string",
		website: "required|string"
	};

	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
				success: false,
				message: "Validation failed",
				data: err
			});
		} else {
			next();
		}
	});
};

module.exports = {
	saveGame,
	saveStudio
};
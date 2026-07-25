const { MongoClient } = require("mongodb");

let database;

const initDb = async () => {
	if (database) {
		return database;
	}

	try {
		const client = new MongoClient(process.env.MONGODB_URI);
		await client.connect();

		database = client.db("gamevault");

		console.log("Connected to MongoDB");
		return database;
	} catch (error) {
		console.error("Database connection failed:", error);
		throw error;
	}
};

const getDatabase = () => {
	if (!database) {
		throw new Error("Database not initialized");
	}

	return database;
};

module.exports = {
	initDb,
	getDatabase
};
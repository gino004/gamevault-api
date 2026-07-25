const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("./data/database");
const gameRoutes = require("./routes/games");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/games", gameRoutes);

mongodb
	.initDb()
	.then(() => {
		app.get("/", (req, res) => {
			res.send("Welcome to GameVault API!");
		});

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const session = require("express-session");


require("dotenv").config();
const mongodb = require("./data/database");
const gameRoutes = require("./routes/games");
const studioRoutes = require("./routes/studios");
const passport = require("passport");
require("./config/passport");
const indexRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(session({
	secret: "gamevault-secret",
	resave: false,
	saveUninitialized: false,
})
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Z-Key"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	next();
});

app.use("/", indexRoutes);
app.use("/games", gameRoutes);
app.use("/studios", studioRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb().then(() => {
	app.listen(port, () => { console.log(`Server running on port ${port}`); });
})
	.catch((err) => {
		console.error(err);
	});
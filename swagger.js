const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "GameVault API",
		description: "API documentation for the GameVault project"
	},
	host: "gamevault-api-81pi.onrender.com",
	schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
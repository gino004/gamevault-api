const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "GameVault API",
		description: "API documentation for the GameVault project"
	},
	host: "localhost:8080",
	schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
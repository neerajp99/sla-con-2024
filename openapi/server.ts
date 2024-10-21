import express = require("express");
import swaggerUi = require("swagger-ui-express");
import YAML = require("yamljs");

const app: express.Express = express();
const port: number = 3000;

// Load the OpenAPI specification
const swaggerDocument = YAML.load("./api.yml");

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});

//to access .env variables
require("dotenv").config();

require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const app = express();

//extra packages
const cors = require("cors");

//Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const authenticationMiddleware = require("./middlewares/authentication");

//get routes
const auth = require("./routes/auth");
const chatRouter = require("./routes/chat");

/*middlewares*/
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send('<h1>Chat API  <a href="/api-docs">Documetation</h1>');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/chat", authenticationMiddleware, chatRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

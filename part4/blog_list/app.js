const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("connected to mongodb"))
  .catch((error) => logger.error(error));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);

module.exports = app;

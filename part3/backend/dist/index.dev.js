"use strict";

var app = require("./app");

var http = require("http");

var config = require("./utils/config");

var logger = require("./utils/logger");

var server = http.createServer(app);
server.listen(config.PORT, function () {
  logger.info("Server running on port ".concat(config.PORT));
});
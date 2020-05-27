const logger = require("./logger");

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({ error: "cast error" });
  } else if (error.name === "ValidationError") {
    logger.error(error);
    return res.status(400).json({ error: error.message });
  }

  logger.error(error);

  next(error);
};

module.exports = {
  errorHandler,
};

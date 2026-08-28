const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    data: null,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value already exists";
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
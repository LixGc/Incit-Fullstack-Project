function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error, "this is in error handler");

  switch (error.name) {
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;

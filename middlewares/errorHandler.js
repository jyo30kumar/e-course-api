const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  if (statusCode == 500) {
    console.error(
      "\x1b[33mInternal Server Error:\x1b[0m", // Yellow color
      error
    );
    error.message = "Internal Server Error";
  }
  res.status(statusCode).json({ success: false, message: error.message });
};

export { errorHandler };

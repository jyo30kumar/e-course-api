const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  if (statusCode == 500) {
    error.message = "Internal Server Error";
  }
  res.status(statusCode).json({success:false, message:error.message});
};

export { errorHandler };

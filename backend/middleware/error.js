
export default (err, req, res, next) => {
  console.error("Error:", err.message);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server error. Please try again later.";
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

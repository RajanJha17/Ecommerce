
export default (err, req, res, next) => {
  console.error("Error:", err.message);
  err.statusCode = err.statusCode || 500;

  err.message = err.message || "Server error. Please try again later.";

  if(err.name === "CastError"){
    err.message = "Resource not found.";    
  }

  if(err.name === "ValidationError"){
    err.message = Object.values(err.errors).map((val) => val.message).join(", ");
  }

  if(err.name === "JsonWebTokenError"){
    err.message = "Invalid token. Please log in again.";
  }

  if(err.name === "TokenExpiredError"){
    err.message = "Token expired. Please log in again.";
  }

  if(err.name === "MulterError"){
    err.message = "File upload error.";
  }


  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });


};

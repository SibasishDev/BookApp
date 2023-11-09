

// @desc    Function That Handles Invalid JWT Tokens (UNAUTHORIZED)
const handleJWTError = () => {
return {message : "Invalid token, Please login again!", code : 401};
}

// @desc    Function That Handles Expired JWT Tokens (UNAUTHORIZED)
const handleJWTExpiredError = () =>{
  return {message : "Your token has expired! Please login again!", code : 401};
}


// @desc    Function That Handles MongoDB Duplication Errors (BAD_REQUEST)
const handleDuplicateFieldsDB = (err) => {
  const dupField = Object.keys(err.keyValue)[0];
  const message = `Duplicate field(${dupField}). Please use another value(${err.keyValue[dupField]})!`;
  return {message : message, code : 400};
};

// @desc    Function That Handles MongoDB Validation Errors (BAD_REQUEST)
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return {message : message, code : 400};
};

 const errorHandler =  (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    return error;
};

module.exports = {errorHandler};
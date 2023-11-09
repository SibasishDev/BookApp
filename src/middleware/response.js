const {errorHandler} = require("../utils/errorHandler");

module.exports = {
    errorResponse  : (error,req,res,next) => {
        console.log(error);
        error = errorHandler(error);
        
        res.status(error.code || 500).json({
            code : error.code || 500,
            message : error.message || "Internal server Error!"
        });
    },

   successResponse : (res,status,message,data = null) => {
    const responseData = {
        code : status,
        message : message
    };

    if(data) responseData.data = data;
    
    res.status(status).json(responseData);
   }
}
  
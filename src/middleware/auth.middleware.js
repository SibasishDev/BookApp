
const jwtService = require("../services/jwt/jwt.service");

module.exports = {

    verifyAccessToken : async (req,res,next) => {
         try{
          console.log("middleware");
             let tokenFromReq = req.body.token || req.query.token || req.headers['x-access-token'];
             if (req.headers['authorization']) {
                 const authHeader = req.headers['authorization'];
                 if (!authHeader) return next({ status: 401, message: 'Access Denied token required' });
                 tokenFromReq = authHeader.split(" ")[1];
             }
             console.log(tokenFromReq);
             if (tokenFromReq == null) return next({ status: 401, message: 'Access Denied' });
             const payload = await jwtService.verifyToken({token : tokenFromReq});
             console.log(payload);
             if(!payload) return next({code : 403, message : "Token is expired"});
             delete payload.iat;
             delete payload.exp;
             req.user = payload;
             next();
         }catch(e){
             next(e);
         }
     },

     authenticateRefreshToken: async function (req, res, next) {
        try {
          let tokenFromReq =
            req.body.token || req.query.token || req.headers["x-access-token"];
          if (req.headers["authorization"]) {
            const authHeader = req.headers["authorization"];
            if (!authHeader)
              return res
                .status(400)
                .json(error("Access Denied token required", 400));
            tokenFromReq = authHeader.split(" ")[1];
          }
    
          if (tokenFromReq == null)
            return res.status(404).json(error("Token not found", 404));
          const payload = await jwtService.verifyRefreshToken(tokenFromReq);
          if(!payload)  return res.status(400).json(error("Invalid Token, Access denied!", 401));
          req.refreshUser = payload;
          next();
        } catch (err) {
            next(err);
        }
      }
 }
 
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

class JwtService {
  constructor() {}
  createToken({ id, email}) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id, email},
        config.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: 1 * 60 * 60 },
        function (err, token) {
          if (err) reject("Internal server error");
          resolve(token);
        }
      );
    });
  }

  verifyToken({ token }) {
    return new Promise((resolve, reject) => {
      jwt.verify(token,config.ACCESS_TOKEN_SECRET_KEY, function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }

  createRefreshToken(userId) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          id: userId,
        },
        config.JWT_REFRESH_SECRET,
        { expiresIn: 1 * 24 * 60 * 60 },
        function (err, token) {
          if (err) reject("Internal server error");
          resolve(token);
        }
      );
    });
  }

  verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        config.JWT_REFRESH_SECRET,
        function (err, decoded) {
          if (err) resolve(false);
          resolve(decoded);
        }
      );
    });
  }
}

module.exports = new JwtService();

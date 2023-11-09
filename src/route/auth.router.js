const Router = require("express");
const authController = require("../controllers/auth/auth.Controller");
const {authenticateRefreshToken} = require("../middleware/auth.middleware");

class AuthRouter {
  constructor() {
    this.router = Router();
    this.core();
  }

  core() {
    this.router.post("/login", authController.login);
    this.router.post("/register",authController.register);
    this.router.get("/get-token",authenticateRefreshToken,authController.generateTokens);
  }

  getRouters() {
    return this.router;
  }
}

module.exports = AuthRouter;
const Router = require("express");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const {verifyAccessToken} = require("../middleware/auth.middleware");

class ApiRouter {
  constructor() {
    this.router = Router();
    this.core();
  }

  core() {
    this.router.use("/auth/", new authRouter().getRouters());

    this.router.use(verifyAccessToken);

    this.router.use("/user", new userRouter().getRouters());
  }

  getRouters() {
    return this.router;
  }
}

module.exports = ApiRouter;
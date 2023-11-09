"use strict;";

const authValidation = require("./auth.validation");
const User = require("../../modal/user.modal");
const bcryptService = require("../../services/bcrypt/bcrypt.service");
const jwtService = require("../../services/jwt/jwt.service");
const { successResponse } = require("../../middleware/response");

class authController {
  constructor() {}

  login = async (req, res, next) => {
    try {
      const { error, value } = authValidation.login(req.body);

      if (error) return next({ code: 400, message: error.message });

      const checkUserExist = await User.findOne(
        { email: value.email },
        { email: 1, _id: 1, password: 1 }
      );

      if (!checkUserExist)
        return next({ code: 404, message: "Wrong email,user does not exist" });

      const matchPassword = await bcryptService.matchPassword({
        password: value.password,
        hash: checkUserExist.password,
      });

      if (!matchPassword)
        return next({ code: 400, message: "Wrong password!" });

      const accessToken = await jwtService.createToken({
        id: checkUserExist._id,
        email: checkUserExist.email,
      });

      const refreshToken = await jwtService.createRefreshToken(
        checkUserExist._id
      );

      if (!accessToken && !refreshToken)
        return next({ code: 400, message: "Error in generate token" });

      const data = {
        id: checkUserExist._id,
        email: checkUserExist.email,
        token: { accessToken, refreshToken },
      };

      return successResponse(res, 200, "login successfull", data);
    } catch (e) {
      console.log({ e });
      next(e);
    }
  };

  register = async (req, res, next) => {
    try {
      const { error, value } = authValidation.register(req.body);

      if (error) return next({ code: 400, message: error.message });

      const checkUserExist = await User.findOne({ email: value.email });

      if (checkUserExist)
        return next({ code: 400, message: "User already exist!" });

      value.password = await bcryptService.encryptPassword(value.password);

      delete value.repeatPassword;

      const user = await User.create(value);

      const responseData = user.toJSON();

      delete responseData.password;

      return successResponse(
        res,
        201,
        "User created successfully",
        responseData
      );
    } catch (e) {
      next(e);
    }
  };

  async generateTokens(req, res, next) {
    try {
      const { id } = req.refreshUser;

      const user = await User.findById(id);

      const accessToken = await jwtService.createToken({ user });

      const refreshToken = await jwtService.createRefreshToken(id);

      res.status(200).json({
        status: 200,
        message: "Tokens generated successfully",
        token: { accessToken, refreshToken },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new authController();

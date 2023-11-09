"use strict;";
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');
const helmet = require("helmet");
const Routes = require("./route/api.router");
const {errorResponse} = require("./middleware/response");
const MongoDB = require("./config/mongodb.connection");

 class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
  }

  init() {
    this.setMiddlewareRoutes(this.app);
    this.listenPort(this.app, this.port);
    this.mongodbConnection();
  }

  setMiddlewareRoutes(app) {
    app.use(helmet());

    app.use(morgan("dev"));

    app.use(cors());


    app.use(
      express.json({
        limit: "50mb",
        type: "application/json",
      }),express.urlencoded({
        limit: '50mb',
        urlencoded: false,
        extended: true
      }));

    app.use(compression());

    app.use(express.static("public"));
   
    app.use("/api", new Routes().getRouters());

    app.use(errorResponse);

    app.use("*", (req, res) => {
      return res.status(404).json({
          code: 404,
          data: null,
          message: "Not found.",
          error: 'Not found'
      });
  });

  }

  mongodbConnection() {
    MongoDB.connect();
  }

  listenPort(app, port) {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  }
}

module.exports = new App();
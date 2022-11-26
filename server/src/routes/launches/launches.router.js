const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAportLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAportLaunch);

module.exports = launchesRouter;

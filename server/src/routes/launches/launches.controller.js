const {
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
} = require("../../models/launches.model");
const getPagination = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  try {
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
  } catch (err) {
    return res.status(400).json({ error: "something went wrong" });
  }
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Required launch property is missing",
    });
  }

  const launchDate = (launch.launchDate = new Date(launch.launchDate));
  if (isNaN(launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  try {
    return res.status(201).json(await addNewLaunch(launch));
  } catch (err) {
    return res.status(400).json({ error: "something went wrong" });
  }
}

async function httpAportLaunch(req, res) {
  const launchId = +req.params.id;

  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAportLaunch,
};

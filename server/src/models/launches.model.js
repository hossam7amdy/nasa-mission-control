const axios = require("axios");

const planets = require("./planets.mongo");
const launches = require("./launches.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function saveLaunch(launch) {
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const lastLaunch = await launches.findOne({}).sort("-flightNumber");

  if (!lastLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return lastLaunch.flightNumber;
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({ flightNumber: launchId });
}

async function populateLaunchData() {
  console.log("Download launch data...");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => payload["customers"]);

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: new Date(launchDoc["date_local"]),
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    populateLaunchData();
  }
}

async function getAllLaunches(skip, limit) {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function addNewLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet not found");
  }

  const flightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = {
    ...launch,
    flightNumber,
    upcoming: true,
    customers: ["Hossam", "NASA"],
  };

  await saveLaunch(newLaunch);
  return newLaunch;
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    { flightNumber: launchId },
    { success: false, upcoming: false }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  loadLaunchData,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};

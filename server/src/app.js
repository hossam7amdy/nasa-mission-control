const express = require("express");
const { join } = require("path");

const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(join(__dirname, "..", "public")));

app.use("/v1", api);
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

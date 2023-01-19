require("express-async-errors");
// const winston = require("winston");
const error = require("./middleware/error");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);

// winston.add(winston.transports.File, { filename: "logfile.log" });

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidcity")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = 3900;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
// export vidcity_jwtPrivateKey=mySecureKey

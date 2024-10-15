const express = require("express");
const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRoute");
const path = require("path");
const { connectToDb } = require("./db");
const app = express();
const PORT = 3000;

connectToDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("database connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));

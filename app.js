const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const Role = require("./models/role");
const { addRole } = require("./controllers/roleControllers");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODBCONNECT, (error) => {
  if (error) {
    console.log(`Unable to connect to the server : ${error}`);
  } else {
    console.log("MongoDB is connected");
  }
});

// Role table
app.post("/role/add", addRole);

// Port connection
const port = process.env.port || 8000;

app.listen(port);

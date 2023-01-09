const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const { addRole, deleteRole } = require("./controllers/roleControllers");

const {
  checkRoleValidation,
  RoleDeleteValidation,
  validationMiddleWare,
} = require("./middleWare/middleware");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB_URL, (error) => {
  if (error) {
    console.log(`Unable to connect to the server : ${error}`);
  } else {
    console.log("MongoDB is connected");
  }
});

// Role table
app.post("/role/add", [checkRoleValidation(), validationMiddleWare], addRole);
app.delete(
  "/role/delete/:id",
  [RoleDeleteValidation(), validationMiddleWare],
  deleteRole
);

// Port connection
const port = process.env.port || 8000;

app.listen(port);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database");
const { addRole, deleteRole } = require("./controllers/roleControllers");

const {
  checkRoleValidation,
  validationMiddleWare,
} = require("./middleWare/middleware");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

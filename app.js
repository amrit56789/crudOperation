const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database");
const {
  addRole,
  deleteRole,
  editRole,
  findRole,
  findSingleRoleData,
} = require("./controllers/roleControllers");

const {
  userCreate,
  loginUser,
  getUser,
} = require("./controllers/userControllers");

const {
  checkRoleValidation,
  RoleDeleteValidation,
  RoleEditValidation,
  checkUserValidation,
  emailValidation,
  getUserValidate,
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
app.patch(
  "/role/edit/:id",
  [RoleEditValidation(), validationMiddleWare],
  editRole
);
app.get("/role/list", findRole);
app.get("/role/:id", findSingleRoleData);

// user table
app.post(
  "/user/register",
  [checkUserValidation(), validationMiddleWare],
  userCreate
);

// Login
app.post("/user/login", [emailValidation(), validationMiddleWare], loginUser);
app.get("/user/app/:id", [getUserValidate(), validationMiddleWare], getUser);
// Port connection
const port = process.env.port || 8000;

app.listen(port);

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
  deleteUserLoginData,
  findLimitUserData,
  addAddress,
  userForgetPassword,
  checkResetPasswordToken,
} = require("./controllers/userControllers");

const {
  checkRoleValidation,
  RoleDeleteValidation,
  RoleEditValidation,
  checkUserValidation,
  emailValidation,
  getUserValidate,
  deleteLoginData,
  tokenValidator,
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
app.put(
  "/user/delete",
  [deleteLoginData(), validationMiddleWare],
  deleteUserLoginData
);
app.get("/user/list/:limit/:page", findLimitUserData);

// Address
app.post("/user/address", tokenValidator, addAddress);

// forget password route
app.get("/user/forget-password", userForgetPassword);
app.get(
  "/user/verify-reset-password/:passwordResetToken",
  checkResetPasswordToken
);
// Port connection
const port = process.env.port || 8000;

app.listen(port);

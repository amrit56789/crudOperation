const mongoose = require("mongoose");
const { connection } = require("../util/database");
const role = require("../models/role");

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    allowNull: false,
  },
  password: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  roleId: {
    type: Number,
    ref: role,
    require: true,
    index: true,
  },
  passwordResetToken: {
    type: String,
  },
});

const User = connection.model("User", user);
module.exports = User;

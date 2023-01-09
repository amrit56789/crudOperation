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
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  roleId: {
    type: mongoose.Schema.ObjectId,
    ref: role,
    require: true,
    index: true,
  },
});

const User = connection.model("User", user);
module.exports = User;

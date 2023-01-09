const mongoose = require("mongoose");
const connection = require("../util/database");

const role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Role = connection.model("Role", role);

module.exports = Role;

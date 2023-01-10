const mongoose = require("mongoose");

const { connection } = require("../util/database");
const user = require("../models/user");
const address = new mongoose.Schema(
  {
    address: {
      type: String,
      allowNull: false,
    },
    city: {
      type: String,
      allowNull: false,
    },
    state: {
      type: String,
      allowNull: false,
    },
    pin_code: {
      type: Number,
      allowNull: false,
    },
    phone_number: {
      type: Number,
      allowNull: false,
    },
    userId: {
      type: String,
      ref: user,
      required: true,
      index: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Address = connection.model("Address", address);

module.exports = Address;

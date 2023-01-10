const mongoose = require("mongoose");
const { connection } = require("../util/database");

const accessToken = new mongoose.Schema(
  {
    userId: {
      type: String,
      allowNull: false,
      unique: true,
    },
    token: {
      type: String,
      allowNull: false,
      unique: true,
    },
    expiryDate: {
      type: String,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
const Token = connection.model("Token", accessToken);
module.exports = Token;

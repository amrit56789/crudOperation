const mongoose = require("mongoose");

const connection = mongoose.createConnection(
  `mongodb://${process.env.HOST}:27017/${process.env.dbNAME}`
);

module.exports = connection;

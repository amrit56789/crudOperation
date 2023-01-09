const mongoose = require("mongoose");

const mongoDbConnect = mongoose.connect(process.env.MONGO_DB_URL, (error) => {
  if (error) {
    console.log(`Unable to connect to the server : ${error}`);
  } else {
    console.log("MongoDB is connected");
  }
});

const connection = mongoose.createConnection(
  `mongodb://${process.env.HOST}:27017/${process.env.dbNAME}`
);

module.exports = { connection, mongoDbConnect };

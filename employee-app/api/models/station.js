const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
  });

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;

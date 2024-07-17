const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  departure: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  arrival: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
});

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;

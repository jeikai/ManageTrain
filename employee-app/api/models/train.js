const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: {type: String},
  capacity: {type: Number, default: 0},
  trip: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Trip' }]
});

const Train = mongoose.model("Attendance", trainSchema);

module.exports = Train;

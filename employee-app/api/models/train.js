const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: {type: String},
  capacity: {type: Number, default: 0},
  trip: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Trip', default: '' }]
});

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;

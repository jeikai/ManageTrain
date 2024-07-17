const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    name: { type: String },
    departureTime: { type: Date },
    arrivalTime: { type: Date },
    route: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
    customer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    seatsBooked: { type: Number },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

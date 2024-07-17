const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
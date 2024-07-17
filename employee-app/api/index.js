const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://taikhoi:phamtaikhoi123@cluster0.z8uyvbi.mongodb.net/FunTrain", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

// Import models
const Trip = require("./models/trip");
const Station = require("./models/station");
const Customer = require("./models/customer");
const Train = require("./models/train");
const Route = require("./models/route");
const Employee = require("./models/employee");

// Trip Endpoints
app.post("/trips", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to add trip", error });
  }
});

app.put("/trips/:id", async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to update trip", error });
  }
});

app.delete("/trips/:id", async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete trip", error });
  }
});

// Station Endpoints
app.post("/stations", async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to add station", error });
  }
});

app.put("/stations/:id", async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to update station", error });
  }
});

app.delete("/stations/:id", async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Station deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete station", error });
  }
});

// Customer Endpoints
app.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to add customer", error });
  }
});

app.put("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to update customer", error });
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Customer deleted" });
  } catch (error) {
    res.status (500).json({ message: "Failed to delete customer", error });
  }
});

// Train Endpoints
app.post("/trains", async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: "Failed to add train", error });
  }
});

app.get("/trains", async (req, res) => {
  try {
    const train = await Train.find();
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: "Failed to add train", error });
  }
});

app.put("/trains/:id", async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ message: "Failed to update train", error });
  }
});

app.delete("/trains/:id", async (req, res) => {
  try {
    await Train.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Train deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete train", error });
  }
});

// Route Endpoints
app.post("/routes", async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: "Failed to add route", error });
  }
});

app.put("/routes/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: "Failed to update route", error });
  }
});

app.delete("/routes/:id", async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Route deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete route", error });
  }
});

// Employee Endpoints
app.post("/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    console.log(req.body)
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to add employee", error });
  }
});

app.post("/employees/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const employee = await Employee.findOne({ phone });
    if (employee) {
      const isMatch = await bcrypt.compare(password, employee.password);
      if (isMatch) {
        res.status(200).json({ success: true, employee });
      } else {
        res.status(401).json({ success: false, message: "Invalid phone or password" });
      }
    } else {
      res.status(401).json({ success: false, message: "Invalid phone or password" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "An error occurred during login", error });
  }
});


app.put("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee", error });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee", error });
  }
});

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  location: {
    type: String,
    required: [true, "Please provide your location"],
  },
  profilePicture: String,
});

CustomerSchema.plugin(uniqueValidator);

CustomerSchema.pre("save", function (next) {
  const customer = this;
  bcrypt.hash(customer.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    customer.password = hash;
    next();
  });
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;

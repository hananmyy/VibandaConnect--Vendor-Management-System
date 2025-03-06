const Rider = require("../models/Rider.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phoneNumber, location, vehicleType, available } =
      req.body;

    // Initialize an array to store validation errors
    let validationErrors = [];

    // Check if passwords match
    if (password !== confirmPassword) {
      validationErrors.push("Passwords do not match");
    }

    // If there are validation errors, flash them and redirect back
    if (validationErrors.length > 0) {
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      return res.redirect("/auth/riderRegister");
    }

    // If passwords match, proceed to create the rider
    const rider = await Rider.create({
      name,
      email,
      password,
      phoneNumber,
      location,
      vehicleType,
      available,
    });
    req.flash('successMessage', 'Registration successful! You can now log in.')
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Error creating rider:", error);

    // Check if error.errors exists before accessing it
    if (error.errors) {
      validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
    } else {
      validationErrors.push("An unexpected error occured");
    }
    req.flash("validationErrors", validationErrors);
    req.flash("data", req.body);

    // Log the error messages in the desired format
    console.log(`[${validationErrors.join(", ")}]`);

    res.redirect("/auth/riderRegister");
  }
};

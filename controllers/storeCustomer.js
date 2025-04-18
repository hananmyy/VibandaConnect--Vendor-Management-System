const Customer = require("../models/Customer.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phoneNumber, location } =
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
      return res.redirect("/auth/customerRegister");
    }

    // If passwords match, proceed to create the vendor
    const customer = await Customer.create({
      name,
      email,
      password,
      phoneNumber,
      location,
      shopName,
    });
    req.flash('successMessage', 'Registration successful! You can now log in.')
    res.redirect("/auth/login");
  } catch (error) {
    console.error("Error creating customer:", error);

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

    res.redirect("/auth/customerRegister");
  }
};

const Rider = require("../models/Rider");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    // Assume vendorId is passed as a parameter for context (e.g., /orders/vendor/:vendorId/riders)
    const vendorId = req.params.vendorId;
    let validationErrors = [];

    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      validationErrors.push("Invalid vendor ID");
      req.flash("validationErrors", validationErrors);
      return res.redirect("/vendorProfile");
    }

    // Retrieve available riders.
    // You might want to filter based on additional criteria (e.g., availability status)
    const riders = await Rider.find({});
    
    res.render("viewRiders", {
      riders,
      successMessage: req.flash("successMessage"),
      validationErrors: req.flash("validationErrors")
    });
  } catch (error) {
    console.error("Error fetching riders:", error);
    req.flash("validationErrors", ["An unexpected error occurred"]);
    res.redirect("/vendorProfile");
  }
};

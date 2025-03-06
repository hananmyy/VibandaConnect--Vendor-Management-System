const Order = require("../models/Order");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    let validationErrors = [];

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      validationErrors.push("Invalid customer ID");
      req.flash("validationErrors", validationErrors);
      return res.redirect("/customerProfile");
    }

    // Find orders for this customer, populating vendor and rider details
    const orders = await Order.find({ customer: customerId })
      .populate('vendor')
      .populate('rider')
      .sort({ createdAt: -1 });

    res.render("viewCustomerOrders", {
      orders,
      successMessage: req.flash("successMessage"),
      validationErrors: req.flash("validationErrors")
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    req.flash("validationErrors", ["An unexpected error occurred"]);
    res.redirect("/customerProfile");
  }
};

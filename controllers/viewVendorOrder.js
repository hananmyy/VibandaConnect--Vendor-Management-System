const Order = require("../models/Order");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    let validationErrors = [];

    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      validationErrors.push("Invalid vendor ID");
      req.flash("validationErrors", validationErrors);
      return res.redirect("/vendorProfile");
    }

    // Find orders for this vendor, populating customer and rider details
    const orders = await Order.find({ vendor: vendorId })
      .populate('customer')
      .populate('rider')
      .sort({ createdAt: -1 });

    res.render("viewVendorOrders", {
      orders,
      successMessage: req.flash("successMessage"),
      validationErrors: req.flash("validationErrors")
    });
  } catch (error) {
    console.error("Error fetching vendor orders:", error);
    req.flash("validationErrors", ["An unexpected error occurred"]);
    res.redirect("/vendorProfile");
  }
};

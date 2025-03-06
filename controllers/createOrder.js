const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { customerId, vendorId, items } = req.body;
    let validationErrors = [];

    // Validate required fields
    if (!customerId || !vendorId || !items || (Array.isArray(items) && items.length === 0)) {
      validationErrors.push("All fields are required");
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      validationErrors.push("Invalid customer ID");
    }
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      validationErrors.push("Invalid vendor ID");
    }

    if (validationErrors.length > 0) {
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      return res.redirect("/customer/createOrder");
    }

    // Check if customer and vendor exist and if vendor is in customer's location
    const customer = await Customer.findById(customerId);
    const vendor = await Vendor.findById(vendorId);

    if (!customer || !vendor) {
      validationErrors.push("Customer or Vendor not found");
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      return res.redirect("/customer/createOrder");
    }

    // Ensure the vendor is in the same location as the customer
    if (customer.location !== vendor.location) {
      validationErrors.push("Vendor is not in your location");
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      return res.redirect("/customer/createOrder");
    }

    // Create the order
    const newOrder = await Order.create({
      customer: customerId,
      vendor: vendorId,
      items,
      location: vendor.location,
    });

    req.flash("successMessage", "Order created successfully");
    res.redirect(`/orders/customer/${customerId}`);
  } catch (error) {
    console.error("Error creating order:", error);
    let validationErrors = [];
    if (error.errors) {
      validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
    } else {
      validationErrors.push("An unexpected error occurred");
    }
    req.flash("validationErrors", validationErrors);
    req.flash("data", req.body);
    res.redirect("/customer/createOrder");
  }
};

const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Rider = require("../models/Rider");

module.exports = async (req, res) => {
  const { email, password, loginRole } = req.body;

  console.log('Request body:', req.body) // Log the request body to ensure it's being received correctly

  // Validation
  if (!email || !password || !loginRole) {
    console.log('Validation failed: missing fields');
    req.flash('error', 'Please fill all fields');
    console.log('Flash error set: Please fill all fields');
    return res.redirect('/auth/login');
  }

  try {
    let user;
    if (loginRole === 'customer') {
      user = await Customer.findOne({ email });
      console.log('Customer data:', user);
      if (user && await bcrypt.compare(password, user.password)) {
        console.log('Customer login successful');
        req.session.userId = user._id;
        req.flash('successMessage', 'Login Successful! Welcome back.')
        return res.redirect('/customerProfile');
      }
    } else if (loginRole === 'vendor') {
      user = await Vendor.findOne({ email });
      console.log('Vendor data:', user);
      if (user && await bcrypt.compare(password, user.password)) {
        console.log('Vendor login successful');
        req.session.userId = user._id;
        req.flash('successMessage', 'Login Successful! Welcome back.')
        return res.redirect('/vendorProfile');
      }
    } else if (loginRole === 'rider') {
      user = await Rider.findOne({ email });
      console.log('Rider data:', user);
      if (user && await bcrypt.compare(password, user.password)) {
        console.log('Rider login successful');
        req.session.userId = user._id;
        req.flash('successMessage', 'Login Successful! Welcome back.')
        return res.redirect('/riderProfile');
      }
    }

    // If user is not found or password is incorrect
    console.log(`${loginRole} not found or password mismatch`);
    req.flash('error', 'Invalid email, password, or role');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error during login:', error);
    req.flash('error', 'Something went wrong. Please try again later.');
    res.redirect('/auth/login');
  }
};

const Vendor = require('../models/Vendor');

module.exports = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  try {
    const vendor = await Vendor.findById(req.session.userId);
    res.render('vendorProfile', { vendor });
  } catch (error) {
    console.error('Error fetching vendor details:', error);
    res.redirect('/auth/login');
  }
};

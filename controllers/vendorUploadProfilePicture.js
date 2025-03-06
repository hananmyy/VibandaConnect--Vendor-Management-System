const Vendor = require("../models/Vendor.js");
const path = require('path');

module.exports = async (req, res) => {
  try {
    const profilePicture = req.files.profilePicture;
    const uploadPath = path.resolve(__dirname, '../public/uploads', profilePicture.name);
    
    // Move the file
    await profilePicture.mv(uploadPath);

    // Update the vendor's profile with the uploaded picture's path
    await Vendor.findByIdAndUpdate(req.session.userId, { profilePicture: '/uploads/' + profilePicture.name });

    res.redirect('/vendorProfile');
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.redirect('/vendorProfile');
  }
};

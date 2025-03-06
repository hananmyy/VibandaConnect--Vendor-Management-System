const Customer = require("../models/Customer.js");
const path = require('path');

module.exports = async (req, res) => {
  try {
    const profilePicture = req.files.profilePicture;
    const uploadPath = path.resolve(__dirname, '../public/uploads', profilePicture.name);
    
    // Move the file
    await profilePicture.mv(uploadPath);

    // Update the customer's profile with the uploaded picture's path
    await Customer.findByIdAndUpdate(req.session.userId, { profilePicture: '/uploads/' + profilePicture.name });

    res.redirect('/customerProfile');
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.redirect('/customerProfile');
  }
};

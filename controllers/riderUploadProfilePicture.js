const Rider = require("../models/Rider.js");
const path = require('path');

module.exports = async (req, res) => {
  try {
    const profilePicture = req.files.profilePicture;
    const uploadPath = path.resolve(__dirname, '../public/uploads', profilePicture.name);
    
    // Move the file
    await profilePicture.mv(uploadPath);

    // Update the rider's profile with the uploaded picture's path
    await Rider.findByIdAndUpdate(req.session.userId, { profilePicture: '/uploads/' + profilePicture.name });

    res.redirect('/riderProfile');
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.redirect('/riderProfile');
  }
};

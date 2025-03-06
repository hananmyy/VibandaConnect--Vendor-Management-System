const Rider = require('../models/Rider');

module.exports = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  try {
    const rider = await Rider.findById(req.session.userId);
    res.render('riderProfile', { rider });
  } catch (error) {
    console.error('Error fetching rider details:', error);
    res.redirect('/auth/login');
  }
};

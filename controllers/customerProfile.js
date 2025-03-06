const Customer = require('../models/Customer'); // Import the Customer model

module.exports = async (req, res) => {
  if (!req.session.userId) { // Check if the user is logged in by verifying the session data
    return res.redirect('/auth/login'); // If not logged in, redirect to the login page
  }
  try {
    const customer = await Customer.findById(req.session.userId); // Fetch customer details from the database using the userId stored in the session
    res.render('customerProfile', { customer }); // Render the customerProfile view and pass the customer object to the template
  } catch (error) {
    console.error('Error fetching customer details:', error); // Log any errors that occur during the database query
    res.redirect('/auth/login'); // If an error occurs, redirect to the login page
  }
};

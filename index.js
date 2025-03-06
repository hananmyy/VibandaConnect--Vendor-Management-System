const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const fileUpload = require('express-fileupload')


app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(expressSession({
  secret: 'keyboard mouse',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(fileUpload())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to set loggedIn variable
app.use("*", (req, res, next) => {
  res.locals.isLoggedIn = Boolean(req.session.userId);
  next();
});

// Middleware to Pass Flash Messages
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.error = req.flash('error');
  console.log('Flash middleware:', res.locals);
  next();
});



// Import controllers
const homeController = require("./controllers/home");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const newCustomerController = require("./controllers/newCustomer");
const newVendorController = require("./controllers/newVendor");
const newRiderController = require("./controllers/newRider");
const storeCustomerController = require("./controllers/storeCustomer");
const storeVendorController = require("./controllers/storeVendor");
const storeRiderController = require("./controllers/storeRider");
const customerProfileController = require("./controllers/customerProfile");
const vendorProfileController = require("./controllers/vendorProfile");
const riderProfileController = require("./controllers/riderProfile");
const updateCustomerController = require("./controllers/updateCustomer")
const deleteCustomerController = require("./controllers/deleteCustomer")
const customerUploadProfilePictureController = require("./controllers/customerUploadProfilePicture");
const updateRiderController = require("./controllers/updateRider")
const deleteRiderController = require("./controllers/deleteRider")
const riderUploadProfilePictureController = require("./controllers/riderUploadProfilePicture");
const updateVendorController = require("./controllers/updateVendor")
const deleteVendorController = require("./controllers/deleteVendor")
const vendorUploadProfilePictureController = require("./controllers/vendorUploadProfilePicture");
const createOrderController = require('./controllers/createOrder');
const viewCustomerOrderController = require('./controllers/viewCustomerOrder');
const viewVendorOrderController = require('./controllers/viewVendorOrder');
const viewRiderController = require('./controllers/viewRider');
const viewVendorsByLocationController = require('./controllers/viewVendorsByLocation');
const createOrderPageController = require('./controllers/createOrderPage')



// define routes
app.get('/', homeController);
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/auth/login', loginController);
app.get('/auth/logout', logoutController);
app.get('/customerProfile', customerProfileController);
app.get('/vendorProfile', vendorProfileController);
app.get('/riderProfile', riderProfileController);
app.get('/auth/customerRegister', newCustomerController);
app.get('/auth/vendorRegister', newVendorController);
app.get('/auth/riderRegister', newRiderController);
app.get('/orders/customer/:customerId', viewCustomerOrderController)
app.get('/orders/vendor/:vendorId', viewVendorOrderController)
app.get('/orders/vendor/:vendorId/riders', viewRiderController)
app.get('/customer/:customerId/vendors', viewVendorsByLocationController)
app.get('/customer/createOrder', createOrderPageController)

app.post('/user/login', loginUserController);
app.post('/customer/register', storeCustomerController);
app.post('/vendor/register', storeVendorController);
app.post('/rider/register', storeRiderController);
app.post('/customer/update', updateCustomerController)
app.post('/customer/delete', deleteCustomerController)
app.post('/customer/uploadPicture', customerUploadProfilePictureController )
app.post('/rider/update', updateRiderController)
app.post('/rider/delete', deleteRiderController)
app.post('/rider/uploadPicture', riderUploadProfilePictureController )
app.post('/vendor/update', updateVendorController)
app.post('/vendor/delete', deleteVendorController)
app.post('/vendor/uploadPicture', vendorUploadProfilePictureController )
app.post('/orders/create', createOrderController)

app.use((req,res) => res.render('notFound'))


mongoose.connect("mongodb://localhost/vibanda_connect").then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


app.listen(3500, () => {
  console.log("App listening on port 3500");
});

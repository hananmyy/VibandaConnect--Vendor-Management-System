const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt')

const VendorSchema = new Schema({
    name:{
        type: String,
        required:[true,'Please provide your name'],
    },
    email:{
        type: String,
        required:[true,'Please provide your email'],
        unique: true,
    },
    password:{
        type:String,
        required:[true,'Please provide your password'],
    },
    phoneNumber:{
        type:String,
        required:[true,'Please provide your phone number'],
    },
    location:{
        type:String,
        required: [true,'Please provide your location'],
    },
    shopName:{
        type: String,
        required:[true,'Please provide your shop name'],
    },
    profilePicture: String,
})

VendorSchema.plugin(uniqueValidator);

VendorSchema.pre("save", function (next) {
  const vendor = this;
  bcrypt.hash(vendor.password, 10, (error, hash) => {
    vendor.password = hash;
    next();
  });
});

const Vendor = mongoose.model("Vendor", VendorSchema)
module.exports = Vendor;
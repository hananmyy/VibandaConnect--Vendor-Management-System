const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt')

const RiderSchema = new Schema({
    name:{
        type: String,
        required:[true,'Please provide your name'],
    },
    email:{
        type: String,
        required:[true,'Please provide your email address'],
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
    vehicleType:{
        type: String,
        required:[true,'Please provide your vehicle type'],
    },
    available:{
        type:String,
        required: [true,'Please provide your availability'],
    },
    profilePicture: String,
})

RiderSchema.plugin(uniqueValidator);

RiderSchema.pre("save", function (next) {
  const rider = this;
  bcrypt.hash(rider.password, 10, (error, hash) => {
    rider.password = hash;
    next();
  });
});

const Rider = mongoose.model("Rider", RiderSchema)
module.exports = Rider;
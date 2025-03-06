const Vendor = require("../models/Vendor.js")

module.exports = async(req,res) =>{
    try {
        const{name, email, phoneNumber, location, shopName} = req.body
        await Vendor.findByIdAndUpdate(req.session.userId, {name, email, phoneNumber, location, shopName })
        res.redirect('/vendorProfile')
    } catch (error) {
        console.error("Error updating vendor:", error)
        res.redirect('/vendorProfile')
    }
}
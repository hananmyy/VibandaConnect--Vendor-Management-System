const Vendor = require("../models/Vendor.js")

module.exports = async(req, res) =>{
    try {
        await Vendor.findByIdAndDelete(req.session.userId)
        req.session.destroy(() =>{
            res.redirect('/')
        })
    } catch (error) {
        console.error("Error deleting vendor:", error)
        res.redirect('/vendorProfile')
    }
}
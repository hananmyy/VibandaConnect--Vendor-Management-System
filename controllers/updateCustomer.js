const Customer = require("../models/Customer.js")

module.exports = async(req,res) =>{
    try {
        const{name, email, phoneNumber, location} = req.body
        await Customer.findByIdAndUpdate(req.session.userId, {name, email, phoneNumber, location })
        res.redirect('/customerProfile')
    } catch (error) {
        console.error("Error updating customer:", error)
        res.redirect('/customerProfile')
    }
}
const Rider = require("../models/Rider.js")

module.exports = async(req,res) =>{
    try {
        const{name, email, phoneNumber, location, vehicleType, available} = req.body
        await Rider.findByIdAndUpdate(req.session.userId, {name, email, phoneNumber, location, vehicleType, available })
        res.redirect('/riderProfile')
    } catch (error) {
        console.error("Error updating rider:", error)
        res.redirect('/riderProfile')
    }
}
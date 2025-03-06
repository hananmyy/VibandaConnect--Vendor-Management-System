const Customer = require("../models/Customer.js")

module.exports = async(req, res) =>{
    try {
        await Customer.findByIdAndDelete(req.session.userId)
        req.session.destroy(() =>{
            res.redirect('/')
        })
    } catch (error) {
        console.error("Error deleting customer:", error)
        res.redirect('/customerProfile')
    }
}
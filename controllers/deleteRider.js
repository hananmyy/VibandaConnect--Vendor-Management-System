const Rider = require("../models/Rider.js")

module.exports = async(req, res) =>{
    try {
        await Rider.findByIdAndDelete(req.session.userId)
        req.session.destroy(() =>{
            res.redirect('/')
        })
    } catch (error) {
        console.error("Error deleting rider:", error)
        res.redirect('/riderProfile')
    }
}
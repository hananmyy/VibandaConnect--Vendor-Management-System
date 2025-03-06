const Vendor = require('../models/Vendor')
const Customer = require('../models/Customer')

module.exports = async (req, res) => {
    try {
        const { customerId } = req.params

        const customer = await Customer.findById(customerId)
        if (!customer) {
            let validationErrors = ['Customer not found']
            req.flash('validationErrors', validationErrors)
            return res.redirect('/customers' + customerId + '/vendors')
        }
        
        const vendors = await Vendor.find({ location: customer.location})

        res.render('viewVendorsByLocation', {
            vendors,
            successMessage: req.flash('successMessage'),
            validationErrors: req.flash('valiationErrors')
        })
        
    } catch (error) {
        console.error("Error fetching vendors by location:", error)

        let validationErrors = ["An unexpected error occurred"]
        req.flash("validationErrors", validationErrors)

        console.log(`[${validationErrors.join(", ")}]`)

        res.redirect("/customers/" + req.params.customerId + "/vendors")
        
    }
}
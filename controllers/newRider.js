module.exports = (req,res) =>{
    var name =""
    var email =""
    var password =""
    var confirmPassword = ""
    var phoneNumber =""
    var location =""
    var vehicleType = ""
    var available = ""
    const data = req.flash('data')[0]

    if(typeof data != "undefined"){
        name = data.name
        email = data.email
        password = data.password
        confirmPassword = data.confirmPassword
        phoneNumber = data.phoneNumber
        location = data.location
        vehicleType = data.vehicleType
        available = data.available
    }

    res.render('riderRegistration',{
        errors: req.flash('validationErrors'),
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: phoneNumber,
        location: location,
        vehicleType: vehicleType,
        available: available
    })
}
module.exports = function (user, userData) {
    if (userData.name)
        user.name = userData.name
    if (userData.username)
        user.username = userData.username
    if (userData.password)
        user.password = userData.password
    if (userData.gender)
        user.gender = userData.gender
    if (userData.dob)
        user.dob = userData.dob
    if (userData.status)
        user.status = userData.status
    if (userData.role)
        user.role = userData.role
    if (userData.description)
        user.description = userData.description
    if (!user.address)
        user.address = {};
    if (userData.tempAddress)
        user.address.tempAddress = typeof (userData.tempAddress) == 'string'
            ? userData.tempAddress.split(',')
            : userData.rempAddress;
    if (userData.permanentAddress)
        user.address.permanentAddress = userData.permanentAddress
    if (!user.contactInformation)
        user.contactInformation = {}
    if (userData.email)
        user.contactInformation.email = userData.email
    if (userData.phoneNumber)
        user.contactInformation.phoneNumber = userData.phoneNumber
    if(userData.isMarried)
        user.isMarried = userData.isMarried

    return user;
}
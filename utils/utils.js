var crypto = require('crypto')

module.exports.passwordHash  = function passwordtoHash(password){
    return crypto.createHash('sha256').update(password).digest('hex')
}

module.exports.varifyPassword = function varifyPassword({inputpassword, passwordhashfromdb}){
    const passwordhashfromuser = 
    crypto.createHash('sha256').update(inputpassword).digest('hex')
    console.log(passwordhashfromdb)
    return passwordhashfromuser === passwordhashfromdb

}


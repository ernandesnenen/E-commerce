const exjwt = require('express-jwt')
const secret = require('../config').secret


function getTokenFromHeard(req){
    if(!req.headers.autorization) return null;
    const token = req.headers.autorization.split(" ")
    if(token[0] !== "Ecommerce") return null;
    return token[1]

}
 
const auth = { 
    required: exjwt({
        secret,
        userProperty:'payload',
        getToken: getTokenFromHeard
    }),
    optional: exjwt({
        secret,
        userProperty:'payload',
        credentialsRequired:false,
        getToken: getTokenFromHeard
    }),


}

module.exports = auth

const jwt = require('express-jwt')
const secret = require('../config').secret


function getTokenFromHeard(req){
    if(!req.headers.authorization) return null;
    const token = req.headers.authorization.split(" ")
    console.log('chegou aqui no token')
    if(token[0] !== "Ecommerce") return null;
    return token[1]

}
 
const auth = { 
   
    required: jwt({
        secret,
        userProperty:'payload',
        getToken: getTokenFromHeard,
        algorithms: ['HS256']
    }),
    optional: jwt({
        secret,
        userProperty:'payload',
        credentialsRequired:false,
        getToken: getTokenFromHeard, 
        algorithms: ['HS256']

    }),


}

module.exports = auth

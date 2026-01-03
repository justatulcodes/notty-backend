const { getUser } = require("../service/auth")


async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.headers.authorization;
    if(!userUid) {
        return res.status(401).send({status : "Unauthorized", message : "User is not authorized. Please login with your account."})
    }
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token)

    if(!user){
        return res.status(401).send({status : "Unauthorized", message : "User is not found. Please login with your account."})
    }
    
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    const userUid = req.headers.authorization;
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token)
    
    req.user = user
    next()
}



module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}
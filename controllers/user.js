const User = require("../models/user")
const { v4: uuidV4 } = require("uuid")
const { setUser } = require("../service/auth")
const bcrypt = require("bcrypt")

const saltRounds = 10;

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(409).send({ message: "Email already registered" })
    }

    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if(err) {
            return res.status(500).send({status : "failure", message: "Error in hashing password"})
        }
        try {
            await User.create({
            name : name,
            email : email,
            password : hash
            })
        return res.status(201).send({status : "success", message : "User created successfully!"})
        
    } catch (error) {
        return res.status(400).send({status : "failure", message : "Failed to create user : ", error})
    }    
    });
    
}

async function handleUserLogin(req, res) {
    const { email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    return res.status(400).send({status : "failure", message : "Invalid Credentials"})
                }
                if(result) {
                    const token = setUser(user)
                    return res
                    .status(200)
                    .send({status : "success", message : "Logged in successfully!", token : token})
                }else{
                    return res.status(400).send({status : "failure", message : "The password entered is incorrect!"})
                }
            });
            
        }else{
            return res.status(400).send({status : "failure", message : "User not found!"})
        }
    }catch(error) {
        return res.status(500).send({status : "failure", message : "Failed to login user: "+ error})
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const {connectMongoDb} = require("./connections")
const userRoute = require("./routes/user")
const notesRoute = require("./routes/notes")
const cookiePraser = require("cookie-parser")
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth")

const app = express()
const PORT = 5002

connectMongoDb("mongodb://127.0.0.1:27017/notty")

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))


//Middleware or you can say a plugin to get body data for POST APIs
app.use(
    express.urlencoded({ urlencoded: false })
)
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5174' // your Vite dev server
}));
app.use(express.json()); 

app.use('/user', userRoute)
app.use("/notes", restrictToLoggedInUserOnly, notesRoute)


app.get("/", checkAuth, (req, res) => {

    if(!req.user) {
        //user is not logged in
        console.log("user is NOT logged it")

    }else{
        //user is logged in
        console.log("user is logged it")
    }
    return res.send("Welcome to notty server!")
})

app.get("/health", (req, res) => {
    return res.send("API Server is healthy!")
})

app.listen(PORT, () => {
    console.log("Server Started");
    
})
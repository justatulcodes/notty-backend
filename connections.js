const mongoose = require("mongoose")

async function connectMongoDb(url) {
    return mongoose.connect("mongodb+srv://atul:vlh5j1J1Do1jV2wO@playgroundcluster.m9dwgal.mongodb.net/?appName=PlaygroundCluster")
    .then(() => {
        console.log("MongoDB Connection success!")
    })
    .catch((e) => {
        console.log("Error in connecting to MongoDB ", e );
        
    })
}

module.exports = {
    connectMongoDb
}
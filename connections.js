const mongoose = require("mongoose")

async function connectMongoDb(url) {
    return mongoose.connect(url)
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
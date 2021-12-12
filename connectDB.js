const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/reading-group-app'

const connectDB = () => {
    mongoose.connect(dbUrl)
        .then(() => console.log("CONNECTED TO MONGODB"))
        .catch(err => {
            console.log("COULD NOT CONNECT TO MONGODB")
            console.log(err)
        })
}

module.exports = connectDB
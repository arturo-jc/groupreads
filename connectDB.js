if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/groupreads'

const connectDB = () => {
    mongoose.connect(dbUrl)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => {
            console.log("Could not connect to  MongoDB")
            console.log(err)
        })
}

module.exports = connectDB
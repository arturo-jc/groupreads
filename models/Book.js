const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndustryIdentifierSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    }
})

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    publisher: String,
    publishedOn: Date,
    description: String,
    industryIdentifiers: [IndustryIdentifierSchema]
})

module.exports = mongoose.model("Book", BookSchema)
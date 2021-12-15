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
    subtitle: String,
    authors: {
        type: [String],
        required: true
    },
    publisher: String,
    publishedOn: Date,
    description: String,
    industryIdentifiers: [IndustryIdentifierSchema],
    pageCount: {
        type: Number,
        min: 0,
        required: true
    },
    imageUrl: String,
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    googleBooksUrl: String
})

module.exports = mongoose.model("Book", BookSchema)
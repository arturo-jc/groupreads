const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    record: {
        type: Schema.Types.ObjectId,
        ref: "Record",
        required: true
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Bookmark", BookmarkSchema)
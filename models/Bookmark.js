const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
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
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Bookmark", BookmarkSchema)
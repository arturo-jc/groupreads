const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
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

module.exports = mongoose.model("Post", PostSchema)
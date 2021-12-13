const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    record: {
        type: Schema.Types.ObjectId,
        ref: "Record",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
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
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model("Post", PostSchema)
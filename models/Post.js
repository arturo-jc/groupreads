const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment")

const PostSchema = new Schema({
    record: {
        type: Schema.Types.ObjectId,
        ref: "Record",
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
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

PostSchema.post("findOneAndDelete", async function(post){
    if(post){
        await Comment.deleteMany({_id: {$in: post.comments}})
    }
})

module.exports = mongoose.model("Post", PostSchema)
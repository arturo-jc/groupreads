const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Marker = require("./Marker");
const Bookmark = require("./Bookmark");
const Post = require("./Post");
const Comment = require("./Comment");

const RecordSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

RecordSchema.post("findOneAndDelete", async function(record){
    if (record){
        await Marker.deleteMany({record: record._id});
        await Bookmark.deleteMany({record: record._id});
        const posts = await Post.find({record: record._id});
        const commentIds = posts.map(post => post.comments).flat();
        await Comment.deleteMany({_id: {$in: commentIds }})
        await Post.deleteMany({record: record._id});
    }
})

module.exports = mongoose.model("Record", RecordSchema)
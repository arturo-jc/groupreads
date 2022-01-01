const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Record = require("./Record")
const Marker = require("./Marker");
const Bookmark = require("./Bookmark");
const Post = require("./Post");
const Comment = require("./Comment");


const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    records: [{
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        startedOn: Date,
        finishedOn: Date
    }]
})

GroupSchema.post("findOneAndDelete", async function(group){
    if(group){
        // Delete all markers in each group record
        await Marker.deleteMany({
            record: {$in: group.records}
        })
        // Delete all bookmarks in each group record
        await Bookmark.deleteMany({
            record: {$in: group.records}
        })
        // Find all posts in each group record
        const posts = await Post.find({
            record: {$in: group.records}
        });
        // Delete all comments in each of those posts
        const commentIds = posts.map(post => post.comments).flat();
        await Comment.deleteMany({_id: {$in: commentIds }})

        // Delete all posts in each group record
        await Post.deleteMany({
            record: {$in: group.records}
        })

        // Delete all records in group
        await Record.deleteMany({
            _id: {$in: group.records }
        })
    }
})

module.exports = mongoose.model("Group", GroupSchema)
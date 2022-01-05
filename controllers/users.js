if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const User = require("../models/User");
const Group = require("../models/Group");
const Record = require("../models/Record")
const Bookmark = require("../models/Bookmark");
const Marker = require("../models/Marker");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { genSalt, hash  } = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../cloudinary");

// POST api/users
module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();

    const payload = {
        user: {
            id: user.id
        }
    }

    const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }
    );

    return res.json({ token })
}

// PUT api/users/
module.exports.changePassword = async (req, res) => {
    const user = await User.findById(req.user.id);
    const { password } = req.body;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
    return res.json({msg: "success"})
}

module.exports.updatePicture = async (req, res) => {
    const profilePic = {
        url: req.file.path,
        filename: req.file.filename
    }
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {$set: { profilePic }}
    ).select("-password")

    if(user.profilePic){
        await cloudinary.uploader.destroy(user.profilePic.filename)
    }
    res.json({user, profilePic })
}

module.exports.deleteAccount = async (req, res) => {

    // Find user
    const user = await User.findById(req.user.id)

    // STEP 1: CASCADE DELETE ALL GROUPS WHERE USER IS ONLY MEMBER

    // Get all groups where user is only member
    const groups = await Group.find(
        { members: { $all: [req.user.id], $size: 1 }}
    )

    // Get id of every record in any one of those groups
    const recordIds = groups.map(group => group.records).flat()

    // Delete all bookmarks and markers in each record
    await Bookmark.deleteMany({ record: { $in: recordIds }})
    await Marker.deleteMany({ record: { $in: recordIds }})

    // Get all posts in each record
    const posts = await Post.find({record: {$in: recordIds}})

    // Delete every comment in any one of those posts
    const commentIds = posts.map(post => post.comments).flat()
    await Comment.deleteMany({_id: {$in: commentIds }})

    // Delete all posts in each record to delete
    await Post.deleteMany({record: {$in: recordIds}})

    // Delete all records in groups to delete
    await Record.deleteMany({_id: {$in: recordIds}})

    // Delete all groups in question
    await Group.deleteMany({ members: { $all: [req.user.id], $size: 1 }})

    // STEP 2: DELETE ALL RESOURCES ASSOCIATED WITH USER

    // Delete all user bookmarks
    await Bookmark.deleteMany({ addedBy: req.user.id})

    // Get all user posts
    const userPosts = await Post.find({author: req.user.id})

    // Delete all comments in any one of those posts
    const userPostComments = userPosts.map(post => post.comments).flat()
    await Comment.deleteMany({_id: {$in: userPostComments }})

    // Delete user posts
    await Post.deleteMany({author: req.user.id})

    // Get all user comments
    const userComments = await Comment.find({author: req.user.id})
    
    // Pull them out of posts
    await Post.updateMany(
        {comments: {$in: userComments}},
        {$pull: {comments: {$in: userComments}}}
        )

    // Delete user comments
    await Comment.deleteMany({author: req.user.id})

    // Pull user from groups
    await Group.updateMany({members: req.user.id}, {$pull: {members: req.user.id}})
    
    // // Tell Cloudinary to delete profile pic if user has one
    if (user.profilePic) {
        await cloudinary.uploader.destroy(user.profilePic.filename)
    }

    // Delete user
    await User.findByIdAndDelete(req.user.id);

    res.json({msg: "ok"})
}
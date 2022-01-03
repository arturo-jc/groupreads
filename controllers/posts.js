const Post = require("../models/Post")

// GET api/groups/:groupId/records/:recordId/posts
module.exports.index = async (req, res) => {
    const posts = await Post.find({ record: req.params.recordId })
        .populate({ path: "author", select: "name" })
        .populate({
            path: "comments",
            populate:
                { path: "author", select: "name" }
        });
    return res.json(posts);
}

// POST api/groups/:groupId/records/:recordId/posts
module.exports.addPost = async (req, res) => {
    const newPost = new Post({
        record: req.params.recordId,
        author: req.user.id,
        title: req.body.title,
        body: req.body.body
    })

    const { _id } = await newPost.save();
    const post = await Post.findById(_id)
        .populate({ path: "author", select: "name" })
        .populate({
            path: "comments",
            populate:
                { path: "author", select: "name" }
        });
    return res.json(post);
}

// PUT api/groups/:groupId/records/:recordId/posts/:postId
module.exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
            $set: {
                title: req.body.title,
                body: req.body.body
            }
        },
        { new: true }
    );
    return res.json(post);
}

// DELETE api/groups/:groupId/records/:recordId/posts/:postId
module.exports.deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.postId);
    return res.json(post)
}
const Post = require("../models/Post")

// GET api/groups/:groupId/records/:recordId/posts
module.exports.index = async (req, res) => {
    const posts = await Post.find({ record: req.params.recordId })
    return res.json(posts);
}

// POST api/groups/:groupId/records/:recordId/posts
module.exports.addPost = async (req, res) => {
    const newPost = new Post({
        record: req.params.recordId,
        // author...
        title: req.body.title,
        body: req.body.body
    })
    const post = await newPost.save();
    return res.json(post);
}

// PUT api/groups/:groupId/records/:recordId/posts/:postId
module.exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
            $Set: {
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
    await Post.findByIdAndDelete(req.params.postId);
    // todo: delete embedded comments
    return res.json({ msg: "Post deleted." })
}
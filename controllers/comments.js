const Comment = require("../models/Comment");
const Post = require("../models/Post");

// GET api/groups/:groupId/records/:recordId/posts/:postId/comments
module.exports.index = async (req, res) => {
    const post = await Post.findById(req.params.commentId)
        .populate("comments");
    return res.json(post.comments);
}

// POST api/groups/:groupId/records/:recordId/posts/:postId/comments
module.exports.addComment = async (req, res) => {
    const newComment = new Comment({
        author: req.user.id,
        body: req.body.body
    });

    await Post.findByIdAndUpdate(
        req.params.postId,
        {
            $addToSet: {
                comments: newComment
            }
        });

    const comment = await newComment.save();
    return res.json(comment);
}

// PUT api/groups/:groupId/records/:recordId/posts/:postId/comments/:commentId
module.exports.updateComment = async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        {
            $set:
                { body: req.body.body }
        },
        { new: true }
    );
    return res.json(comment);
}

// DELETE api/groups/:groupId/records/:recordId/posts/:postId/comments/:commentId
module.exports.deleteComment = async (req, res) => {
    const { commentId, postId } = req.params;

    await Comment.findByIdAndDelete(commentId);

    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    return res.json({ msg: "Comment deleted." })
}
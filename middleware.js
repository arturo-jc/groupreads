if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};
const User = require("./models/User");
const Group = require("./models/Group");
const Book = require("./models/Book");
const Bookmark = require("./models/Bookmark");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require("jsonwebtoken");

// Auth

module.exports.authenticate = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
};

module.exports.isGroupMember = (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    const members = group.members.map(userId => userId.toString());
    if (!members.includes(req.user.id)) {
        return res.status(401).json({ msg: "Not a group member, authorization denied." });
    };
    next();
};

module.exports.ownsBook = async (req, res, next) => {
    const book = await Book.findById(req.params.bookId);
    if (book.addedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Does not own book, authorization denied." });
    };
    next();
};

module.exports.ownsBookmark = async (req, res, next) => {
    const bookmark = await Bookmark.findById(req.params.bookmarkId);
    if (bookmark.addedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Does not own bookmark, authorization denied." })
    };
    next();
};

module.exports.isPostAuthor = async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Is not post author, authorization denied." })
    }
    next();
};

module.exports.isCommentAuthor = async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.author.toString() != req.user.id) {
        return res.status(401).json({ msg: "Is not comment author, authorization denied." })
    }
    next();
}

module.exports.validateRegister = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: "User already exists." })
    };
    next();
};

module.exports.validateLogin = async (req, res, next) => {

    // todo: joi validation

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Invalid credentials." });
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid credentials." });
    }

    next();
};
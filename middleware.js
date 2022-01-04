if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};
const User = require("./models/User");
const Group = require("./models/Group");
const Record = require("./models/Record");
const Book = require("./models/Book");
const Bookmark = require("./models/Bookmark");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const joi = require("joi")
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require("jsonwebtoken");

// PERMISSIONS

module.exports.authenticate = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
};

module.exports.isGroupMember = async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    const members = group.members.map(userId => userId.toString());
    if (!members.includes(req.user.id)) {
        return res.status(401).json({ msg: "Not a group member, authorization denied." });
    };
    next();
};

module.exports.isOnlyGroupMember = async (req, res, next) => {
    const group = await Group.findById(req.params.groupId);
    if (group.members.length > 1) {
        return res.status(401).json({ msg: "Group has more than one member, authorization denied." });
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

module.exports.ownsRecord = async (req, res, next) => {
    const record = await Record.findById(req.params.recordId);
    if (record.owner.toString() !== req.user.id) {
        return res.status(401).json({msg: "Does not own record, authorization denied."})
    };
    next();
}

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

module.exports.ownsAccount = (req, res, next) => {
    if (req.params.userId !== req.user.id) {
        return res.status(401).json({ msg: "Does not own account, authorization denied." });
    };
    next();
};

// VALIDATION

module.exports.validateRegister = async (req, res, next) => {
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required().min(6)
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({ msg: "User already exists." })
    };
    next();
};

module.exports.validateLogin = async (req, res, next) => {

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

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

module.exports.validateGroup = (req, res, next) => {
    const groupSchema = joi.object({
        name: joi.string().required()
    });

    const { error } = groupSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    next();
}

module.exports.validateRecord = (req, res, next) => {
    const recordSchema = joi.object({
        bookId: joi.string().required()
    });

    const { error } = recordSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }

    next();
}

module.exports.validateBookmark = async (req, res, next) => {
    const record = await Record.findById(req.params.recordId)
        .populate({
            path: "book",
            select: "pageCount"
        });

    const bookmarkSchema = joi.object({
        body: joi.string().required(),
        page: joi.number().min(0).max(record.book.pageCount).required()
    });

    const { error } = bookmarkSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    };

    next();
}

module.exports.validateMarker = async (req, res, next) => {
    const record = await Record.findById(req.params.recordId)
        .populate({
            path: "book",
            select: "pageCount"
        });

    const markerSchema = joi.object({
        page: joi.number().min(0).max(record.book.pageCount).required()
    });

    const { error } = markerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    };

    next();
}

module.exports.validatePost = (req, res, next) => {
    const postSchema = joi.object({
        title: joi.string().required(),
        body: joi.string().required()
    });

    const { error } = postSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    };

    next();
}

module.exports.validateComment = (req, res, next) => {
    const commentSchema = joi.object({
        body: joi.string().required()
    });

    const { error } = commentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    };

    next();
}

module.exports.validateBook = (req, res, next) => {

    const bookSchema = joi.object({
        title: joi.string().required(),
        subtitle: joi.string(),
        authors: joi.array().has(joi.string()).required(),
        publisher: joi.string(),
        publishedOn: joi.date(),
        description: joi.string(),
        industryIdentifiers: joi.array().items(
            joi.object({
                type: joi.string().required(),
                identifier: joi.string().required()
            })
        ),
        pageCount: joi.number().min(0),
        imageUrl: joi.string().uri(),
        googleBooksUrl: joi.string().uri()
    });

    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    };

    next();
}
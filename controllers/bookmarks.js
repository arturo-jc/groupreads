const Bookmark = require("../models/Bookmark")

// GET api/groups/:groupId/records/:recordId/bookmarks
module.exports.index = async (req, res) => {
    const bookmarks = await Bookmark.find({ record: req.params.recordId })
    .populate({
        path: "addedBy",
        select: "name"
    })
    return res.json(bookmarks);
}

// POST api/groups/:groupId/records/:recordId/bookmarks
module.exports.addBookmark = async (req, res) => {
    const newBookmark = new Bookmark({
        record: req.params.recordId,
        addedBy: req.user.id,
        body: req.body.body,
        page: req.body.page
    })
    const {_id} = await newBookmark.save();
    const bookmark = await Bookmark.findById(_id)
    .populate({
        path: "addedBy",
        select: "name"
    })
    return res.json(bookmark);
}

// PUT api/groups/:groupId/records/:recordId/bookmarks/:bookmarkId
module.exports.updateBookmark = async (req, res) => {
    const bookmark = await Bookmark.findByIdAndUpdate(
        req.params.bookmarkId,
        {
            $set: {
                body: req.body.body,
                page: req.body.page
            }
        },
        { new: true }
    );
    return res.json(bookmark);
}

// DELETE api/groups/:groupId/records/:recordId/bookmarks/:bookmarkId
module.exports.deleteBookmark = async (req, res) => {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.bookmarkId);
    return res.json(bookmark)
}
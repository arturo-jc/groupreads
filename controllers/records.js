const Group = require("../models/Group")
const Record = require("../models/Record")

// GET api/groups/:groupId/records
module.exports.index = async (req, res) => {
    const group = await Group.findById(req.params.groupId)
        .populate({
            path: "records",
            populate: "book"
        })
    return res.json(group.records);
}

// POST api/groups/:groupId/records
module.exports.addRecord = async (req, res) => {
    const newRecord = new Record({ 
        book: req.body.bookId,
        owner: req.user.id
     })

    const group = await Group.findByIdAndUpdate(
        req.params.groupId,
        {
            $addToSet: {
                records: newRecord
            }
        },
        { new: true })
        .populate({ path: "members", select: "-password" })
        .populate({ path: "pendingRequests", select: "name"})
        .populate({ path: "declinedRequests", select: "name"})
        .populate({ path: "records", populate: { path: "book", select: "title authors imageUrl" } });
        
        newRecord.save();
    return res.json(group);
}

// GET api/groups/:groupId/records/:recordId
module.exports.showRecord = async (req, res) => {
    const record = await Record.findById(req.params.recordId)
        .populate("book");
    return res.json(record);
}

// DELETE api/groups/:groupId/records/:recordId
module.exports.deleteRecord = async (req, res) => {
    const { groupId, recordId } = req.params;

    await Record.findByIdAndDelete(req.params.recordId)

    const group = await Group.findByIdAndUpdate(
        groupId,
        {
            $pull: {
                records: { _id: recordId}
            }
        },
        { new: true })
        .populate({ path: "members", select: "-password" })
        .populate({ path: "pendingRequests", select: "name"})
        .populate({ path: "declinedRequests", select: "name"})
        .populate({ path: "records", populate: { path: "book", select: "title authors imageUrl" } });
        
    return res.json(group);
}
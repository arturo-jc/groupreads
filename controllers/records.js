const Group = require("../models/Group")
const Record = require("../models/Record")

// GET api/groups/:groupId/records
module.exports.index = async (req, res) => {
    const group = await Group.findById(req.params.groupId)
        .populate("records")
    return res.json(group.records);
}

// POST api/groups/:groupId/records
module.exports.addRecord = async (req, res) => {
    const newRecord = new Record({ book: req.body.bookId })

    await Group.findByIdAndUpdate(
        req.params.groupId,
        {
            $AddToSet: {
                records: newRecord
            }
        })

    const record = await newRecord.save()
    return res.json(record);
}

// GET api/groups/:groupId/records/:recordId
module.exports.showRecord = async (req, res) => {
    const record = await Record.findById(req.params.recordId)
        .populate("book");
    return res.json(record);
}

// PUT api/groups/:groupId/records/:recordId
module.exports.updateRecord = async (req, res) => {
    const record = await Record.findByIdAndUpdate(
        req.params.recordId,
        {
            $Set:
            {
                startedOn: req.body.startedOn,
                finishedOn: req.body.finishedOn
            }
        },
        { new: true }
    );
    return res.json(record);
}

// DELETE api/groups/:groupId/records/:recordId
module.exports.deleteRecord = async (req, res) => {
    const { groupId, recordId } = req.params;

    await Record.findByIdAndDelete(req.params.recordId)

    await Group.findByIdAndUpdate(
        groupId,
        {
            $pull: {
                records: recordId
            }
        })

    return res.json({ msg: "Record deleted" })
}
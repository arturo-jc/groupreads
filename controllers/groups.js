const Group = require("../models/Group")

// GET api/groups
module.exports.index = async (req, res) => {
    const groups = await Group.find({ members: { $in: req.user.id } })
        .populate({ path: "members", select: "name" })
        .populate({ path: "records", populate: { path: "book", select: "title authors imageUrl" } })
    return res.json(groups);
}

// POST api/groups
module.exports.createGroup = async (req, res) => {
    const newGroup = new Group({
        name: req.body.name
    })

    newGroup.members.push(req.user.id);

    // Stupid way of doing things while I figure out a better way
    const { _id } = await newGroup.save();
    const group = await Group.findById(_id)
        .populate({ path: "members", select: "name" })
        .populate({ path: "records", populate: { path: "book", select: "title authors imageUrl" } });
    return res.json(group);
}

module.exports.findGroup = async (req, res) => {
    const group = await Group.findById(req.params.groupId)
        .populate({ path: "members", select: "name" })
    return res.json(group);
}

// DELETE api/groups/groupId
module.exports.deleteGroup = async (req, res) => {
    await Group.findByIdAndDelete(req.params.groupId);
    return res.json({ msg: "Group deleted." })
}
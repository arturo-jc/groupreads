const Group = require("../models/Group")

// GET api/groups
module.exports.index = async (req, res) => {
    const groups = await Group.find({ members: { $in: req.user.id } })
        .populate({ path: "members", select: "name" })
    return res.json(groups);
}

// POST api/groups
module.exports.createGroup = async (req, res) => {
    const newGroup = new Group({
        name: req.body.name
    })

    newGroup.members.push(req.user.id);

    const group = await newGroup.save();
    return res.json(group);
}
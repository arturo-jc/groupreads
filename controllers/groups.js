const Group = require("../models/Group")

// POST api/groups
module.exports.createGroup = async (req, res) => {
    const newGroup = new Group({
        name: req.body.name
    })

    newGroup.members.push(req.user.id);

    const group = await newGroup.save();
    return res.json(group);
}
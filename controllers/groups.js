const Group = require("../models/Group")

// GET api/groups
module.exports.index = async (req, res) => {
    const groups = await Group.find({ members: { $in: req.user.id } })
        .populate({ path: "members", select: "name" })
        .populate({ path: "pendingRequests", select: "name"})
        .populate({ path: "declinedRequests", select: "name"})
        .populate({ path: "records", populate: { path: "book", select: "title subtitle authors imageUrl" } })
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
        .populate({ path: "pendingRequests", select: "name"})
        .populate({ path: "declinedRequests", select: "name"})
        .populate({ path: "records", populate: { path: "book", select: "title subtitle authors imageUrl" } });
    return res.json(group);
}

// GET api/groups/:groupId
module.exports.findGroup = async (req, res) => {
    const group = await Group.findById(req.params.groupId)
        .populate({ path: "members", select: "name" })
    return res.json(group);
}

// PUT api/groups/:groupId/request
module.exports.sendRequest = async (req, res) => {
    await Group.findByIdAndUpdate(
        req.params.groupId,
        { $addToSet: { pendingRequests: req.user.id }}
    )
    return res.json({msg: "Request sent."})
}

// PUT api/groups/:groupId/leave
module.exports.leaveGroup = async (req, res) => {
    const group = await Group.findByIdAndUpdate(
        req.params.groupId,
        {
            $pull: {members: req.user.id }
        }
    )
    return res.json(group)
}

// PUT api/groups/:groupId/:action
module.exports.handleRequest = async (req, res) => {
    const {groupId, action } = req.params;
    const { userId } = req.body;
    let group = null;
    switch(action){
        case "accept":
            group = await Group.findByIdAndUpdate(
                groupId,
                {
                    $pull: {pendingRequests: userId, declinedRequests: userId },
                    $addToSet: { members: userId }
                },
                {new: true}
            )
            .populate({ path: "members", select: "name" })
            .populate({ path: "pendingRequests", select: "name"})
            .populate({ path: "declinedRequests", select: "name"})
            .populate({ path: "records", populate: { path: "book", select: "title subtitle authors imageUrl" } });
            return res.json(group)
        case "decline":
            console.log("hit decline")
            group = await Group.findByIdAndUpdate(
                groupId,
                {
                    $pull: {pendingRequests: userId },
                    $addToSet: { declinedRequests: userId }
                },
                { new: true }
            )
            .populate({ path: "members", select: "name" })
            .populate({ path: "pendingRequests", select: "name"})
            .populate({ path: "declinedRequests", select: "name"})
            .populate({ path: "records", populate: { path: "book", select: "title subtitle authors imageUrl" } });
            console.log(group)
            return res.json(group)
        default:
            return res.status(400).json({msg: "Failed to specify action in params. Possible actions: accept, decline"})
    }
}


// DELETE api/groups/groupId
module.exports.deleteGroup = async (req, res) => {
    const group = await Group.findByIdAndDelete(req.params.groupId);
    return res.json(group)
}
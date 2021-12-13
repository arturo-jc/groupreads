const Marker = require("../models/Marker")

// GET api/groups/:groupId/records/:recordId/markers
module.exports.index = async (req, res) => {
    const markers = await Marker.find({ record: req.params.recordId })
    return res.json(markers);
}

// POST api/groups/:groupId/records/:recordId/markers
module.exports.addMarker = async (req, res) => {
    const newMarker = new Marker({
        record: req.params.recordId,
        // AddedBy...
        page: req.body.page
    })
    const marker = await newMarker.save();
    return res.json(marker);
}

// PUT api/groups/:groupId/records/:recordId/markers/:markerId
module.exports.updateMarker = async (req, res) => {
    const marker = await Marker.findByIdAndUpdate(
        req.params.markerId,
        {
            $set: {
                page: req.body.page
            }
        },
        { new: true }
    )
    return res.json(marker);
}

// DELETE api/groups/:groupId/records/:recordId/markers/:markerId
module.exports.deleteMarker = async (req, res) => {
    await Marker.findByIdAndDelete(req.params.markerId);
    return res.json({ msg: "Bookmark deleted." })
}
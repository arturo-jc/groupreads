if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.id)
    .select("-password")
    .populate({
        path: "profilePic",
        populate: "filename"
    })
    return res.json(user);
}

module.exports.getToken = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    const payload = {
        user: {
            id: user.id
        }
    };

    const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 }
    );

    return res.json({ token });
}
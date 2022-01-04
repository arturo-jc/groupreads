if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const User = require("../models/User");
const { genSalt, hash, compare } = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../cloudinary");

// POST api/users
module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();

    const payload = {
        user: {
            id: user.id
        }
    }

    const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 }
    );

    return res.json({ token })
}

// PUT api/users/
module.exports.changePassword = async (req, res) => {
    const user = await User.findById(req.user.id);
    const { password } = req.body;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
    return res.json({msg: "success"})
}

module.exports.updatePicture = async (req, res) => {
    const profilePic = {
        url: req.file.path,
        filename: req.file.filename
    }
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {$set: { profilePic }}
    ).select("-password")

    if(user.profilePic){
        await cloudinary.uploader.destroy(user.profilePic.filename)
    }
    res.json({user, profilePic })
}

module.exports.deleteAccount = async (req, res, next) => {
    console.log("hit deleteAccount controller")
    // const {userId} = req.params;
    // const {password} = req.body;

    // // Find user and populate for Cloudinary purposes
    // const user = await User.findById(userId)
    // .populate({
    //     path: "profilePic",
    //     populate: "filename"
    // })

    // // Authenticate user
    // const authentication = await user.authenticate(password)
    // if (authentication.error){
    //     return next(authentication.error)
    // }

    // // Delete user reference from households
    // await Household.updateMany({users: user}, {$pull: { users: user._id }})

    // // Delete all user activities
    // await Activity.deleteMany({user})

    // // Delete all user comments and their references from their respective activities
    // const comments = await Comment.find({user})
    // await Activity.updateMany({comments: {$in: comments}}, {$pull: {comments: {$in: comments}}})
    // await Comment.deleteMany({user})
    
    // // Tell Cloudinary to delete profile pic if user has one
    // if (user.profilePic) {
    //     await cloudinary.uploader.destroy(user.profilePic.filename)
    // }

    // // Delete all activity types within empty households
    // const emptyHouseholds = await Household.find({users: {$eq: []}});
    // if (emptyHouseholds){
    //     for (let household of emptyHouseholds){
    //         await ActivityType.deleteMany({_id: {$in: household.activityTypes}})
    //     }
    // }

    // // Delete all empty households
    // await Household.deleteMany({users: {$eq: []}})

    // // Delete user
    // await User.findByIdAndDelete(userId)

    // req.flash("success", "Account deleted.")
    // res.redirect("/login")
    res.json({msg: "ok"})
}
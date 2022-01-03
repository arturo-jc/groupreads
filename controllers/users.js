if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const User = require("../models/User");
const { genSalt, hash, compare } = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken")


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
    const { current, password } = req.body;
    const user = await User.findById(req.user.id)
    const isPasswordValid = await compare(current, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid credentials." });
    }
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
    return res.json({msg: "success"})
}

module.exports.updatePicture = async (req, res) => {
    // Figure out how to get req.file ?
    // Does it come from a middleware
    // GOT IT: they came from Multer

    // const user = await User.findByIdAndUpdate(
    //     req.user.id,
    //     {
    //         $set: {
    //             profilePic: {
    //                 url: req.file.path,
    //                 filename: req.file.filename
    //             }
    //         }
    //     }
    // )
    // console.log(user)
    // .select("-password")
    res.json({msg: "Ok"})
}
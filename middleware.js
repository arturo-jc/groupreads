if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};
const User = require("./models/User");
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
}

module.exports.validateRegister = async (req, res, next) => {
    const { name, email, password } = req.body;

    // todo: joi validation

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: "User already exists." })
    };
    next();
}

module.exports.validateLogin = async (req, res, next) => {

    // todo: joi validation

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Invalid credentials." });
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ msg: "Invalid credentials." });
    }

    next();
}
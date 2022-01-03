const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilePicSchema = new Schema({
    url: String,
    filename: String
})

ProfilePicSchema.virtual("thumbnailLg").get(function(){
    const cropSize = 400
    const width = 200
    return this.url.replace("/upload", `/upload/c_crop,g_face,h_${cropSize},w_${cropSize}/r_max/c_scale,w_${width}`)
})

ProfilePicSchema.virtual("thumbnailSm").get(function(){
    const cropSize = 400
    const width = 40
    return this.url.replace("/upload", `/upload/c_crop,g_face,h_${cropSize},w_${cropSize}/r_max/c_scale,w_${width}`)
})

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: ProfilePicSchema
})

module.exports = mongoose.model("User", UserSchema)
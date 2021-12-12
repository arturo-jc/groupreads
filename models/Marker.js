const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkerSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Marker", MarkerSchema)
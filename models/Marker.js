const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkerSchema = new Schema({
    record: {
        type: Schema.Types.ObjectId,
        ref: "Record",
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
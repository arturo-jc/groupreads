const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    startedOn: {
        type: Date,
        default: null
    },
    finishedOn: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model("Record", RecordSchema)
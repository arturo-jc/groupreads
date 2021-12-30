const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    }
})

module.exports = mongoose.model("Record", RecordSchema)
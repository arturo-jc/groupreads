const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    records: [{
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        startedOn: Date,
        finishedOn: Date
    }]
})

module.exports = mongoose.model("Group", GroupSchema)
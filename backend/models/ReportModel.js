const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');


const ReportSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    gym_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("reports", ReportSchema);

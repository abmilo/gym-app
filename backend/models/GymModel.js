const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');


const GymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    crowdLevel: {
        type: Number,
        required: true
    },
    previousLevel: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date
    }

});

module.exports = mongoose.model("gyms", GymSchema);

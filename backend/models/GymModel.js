const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');


const GymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    crowdLevel: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date
    }

});

module.exports = mongoose.model("gyms", GymSchema);

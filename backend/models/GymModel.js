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
    },
    reportsToday: {
        type: Number,
        required: true,
        default: new Date()
    },
    reportDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    reportTotal: {
        type: Number,
        required: true,
        default: 0
    },

});

module.exports = mongoose.model("gyms", GymSchema);

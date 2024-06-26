const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]*@pitt.edu+$/);
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
var Filter = require('bad-words'),
    filter = new Filter();


const friendSchema = {
    email: String,
    status: String
};


const UserSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email.`
        },
        required: [true, 'Email required']

    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    // firstName: {
    //     type: String,
    //     validate: {
    //         validator: function (v) {
    //             return !filter.isProfane(v);
    //         },
    //         message: props => `Profane Language is not allowed`
    //     },
    //     required: [true, 'First Name required']
    // },
    // middleName: {
    //     type: String,
    //     validate: {
    //         validator: function (v) {
    //             return !filter.isProfane(v);
    //         },
    //         message: props => `Profane Language is not allowed`
    //     },
    //     required: false,
    // },
    // lastName: {
    //     type: String,
    //     validate: {
    //         validator: function (v) {
    //             return !filter.isProfane(v);
    //         },
    //         message: props => `Profane Language is not allowed`
    //     },
    //     required: [true, 'Last Name required']
    // },
    // fullName: {
    //     type: String,
    //     required: true,
    // },
    refreshToken: {
        type: String,
        required: false,
    },
    joined: {
        type: Date,
        required: true,
        default: new Date()
    },
    uuid: {
        type: String,
        default: short.generate(),
        required: true
    },
    lastAtGym: {
        type: Date
    },
    reportsToday: {
        type: Number,
        required: true,
        default: 0
    },
    reportDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    friends: [friendSchema],


});

module.exports = mongoose.model("users", UserSchema);

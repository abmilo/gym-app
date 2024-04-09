const express = require("express");
const router = express.Router();
require("dotenv").config();
const short = require('short-uuid');
const GymModel = require("../models/GymModel")
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyJWT = require("../middleware/verifyJWT");
const ReportModel = require("../models/ReportModel");
// var Filter = require('bad-words'),


router.get('/getGym/:gym', async (req, res) => {
    try {
        const gym = await GymModel.findOne({ _id: req.params.gym });
        if (gym) return res.status(200).json(gym);
        else return res.status(204);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


router.post('/postScore', async (req, res) => {
    try {

        const { user_id, gym_id, score } = req.body;

        const gym = await GymModel.findOne({ _id: gym_id });
        if (!gym) return res.status(400).json({ message: "Gym not found" });

        const user = await UserModel.findOne({ email: user_id });
        if (!user) return res.status(400).json({ message: "User not found" });

        let time = new Date()
        console.log(time.toString())

        let report = new ReportModel({});

        if (user.reportDate.toDateString() == time.toDateString() && user.reportsToday < 5) {
            // update gym, user
            if (gym.reportDate.toDateString() != time.toDateString()) {
                gym.reportDate = time;
                gym.reportsToday = 0;
                gym.reportTotal = 0;
            }
            gym.reportsToday++;
            gym.reportTotal += score;
            gym.previousLevel = gym.crowdLevel;
            gym.crowdLevel = (gym.reportTotal / gym.reportsToday);
            gym.lastUpdated = time;


            user.reportsToday++;
            user.lastAtGym = time;

            // create new report
            report = new ReportModel({
                user_id: user.email,
                gym_id: gym_id,
                score: score,
                time: new Date()
            })
        }
        else if (user.reportDate.toDateString() != time.toDateString()) {
            // set user to new day, update them
            if (gym.reportDate.toDateString() != time.toDateString()) {
                gym.reportDate = time;
                gym.reportsToday = 0;
                gym.reportTotal = 0;
            }
            gym.reportsToday++;
            gym.reportTotal += score;
            gym.previousLevel = gym.crowdLevel;
            gym.crowdLevel = (gym.reportTotal / gym.reportsToday);
            gym.lastUpdated = time;

            user.reportDate = time
            user.reportsToday = 1;
            user.lastAtGym = time;

            // create new report

            report.user_id = user_id;
            report.gym_id = gym_id;
            report.score = score;
            report.time = new Date();


        }
        else {
            return res.status(400).json({ message: "User has exceeded score submissions for today. Please return tomorrow." });
        }


        console.log("hello")
        await gym.save().then(() => {
            console.log("gym saved");
        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
                return;

            })
        await user.save().then(() => {
            console.log("user saved");
        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
                return;

            })


        await report.save().then(() => {
            console.log("report saved");
        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
                return;

            })




        console.log("saving?");
        return res.sendStatus(200);

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

module.exports = router;

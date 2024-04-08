const express = require("express");
const router = express.Router();
require("dotenv").config();
const short = require('short-uuid');
const GymModel = require("../models/GymModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyJWT = require("../middleware/verifyJWT");
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

module.exports = router;

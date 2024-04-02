const express = require("express");
const router = express.Router();
require("dotenv").config();
const short = require('short-uuid');
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyJWT = require("../middleware/verifyJWT");
// var Filter = require('bad-words'),
//     filter = new Filter();



router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email AND password are necessary" });
        }

        const account = await UserModel.findOne({ email: email });

        if (!account) return res.status(400).json({ message: "Account not found" });

        const match = await bcrypt.compare(password, account?.password);

        if (!match) return res.status(400).json({ message: "Incorrect Password" });

        const tokenData = {
            uuid: account?.uuid,
            email: email,
        }

        const accessToken = jwt.sign(
            { ...tokenData },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
            { ...tokenData },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10min" }
        );

        uuid = account?.uuid;
        joined = account?.joined;
        account.refreshToken = refreshToken;
        friends = account.friends
        account.save().then(() => {
            console.log("New Refresh Token Saved");
        },
            (err) => {
                console.log(err);
                res.status(err.status || 400).json({ message: err.message });
                return;

            })


        res.cookie("refreshjwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        });

        res.cookie("accessjwt", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        });

        res.status(201).json({
            message: 'User Logged In',
            data: {
                accessjwt: accessToken,
                email: email,
                uuid: uuid,
                joined: joined,
                friends: friends
            }
        });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }


});



// register user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check email and password against regex
        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]*@pitt.edu+$/);
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

        const isValidEmail = emailRegex.test(email);
        const isValidPassword = passwordRegex.test(password);

        if (!isValidEmail || !isValidPassword) return res.status(400).json({ message: "Email or Password not valid" });


        // check duplicates
        const dup = await UserModel.findOne({ email: email });
        if (dup) {
            console.log("user already exists");
            return res.status(409).send({ message: "User with that email already exists." });
        }

        // hash new user password
        const hashedPwd = await bcrypt.hash(password, parseInt(process.env.SALT));

        // create and save new user with gathered info
        const newUser = new UserModel({
            email: email,
            password: hashedPwd,
            joined: new Date(),
            uuid: short.generate()
        });

        newUser.save().then(() => {
            res.status(201).json({ message: "New User Successfully Saved" });
        },
            (err) => {
                const errs = err?.errors
                const keys = Object.keys(err?.errors);
                const msg = errs[keys[0]]?.properties?.message;
                res.status(err.status || 400).json({ message: msg || err?.message });
                return;

            })

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



router.get('/refresh', async (req, res) => {
    try {
        // console.log("refresh called");
        const cookies = req.cookies;
        // console.log(req.cookies);

        if (!cookies?.refreshjwt) return res.sendStatus(401);
        const refreshToken = cookies?.refreshjwt;

        const account = await UserModel.findOne({ refreshToken }).exec();
        if (!account) return res.status(400).json({ message: "Could not verify account" });

        const tokenData = {
            uuid: account?.uuid,
            email: account?.email,
        }


        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || account.email !== decoded.email) {
                    return res.status(403).json({ message: "You do not have a valid token. Login again to recieve a new one." });

                }
                const accessToken = jwt.sign(
                    { ...tokenData },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "1m" }
                );
                res.status(201).json({
                    message: 'User Token Refreshed',
                    data: {
                        accessjwt: accessToken,
                        email: account?.email,
                        uuid: account?.uuid,
                        joined: account?.joined,
                        friends: account.friends

                    }
                })
            }
        );



    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});



router.get('/getUser', verifyJWT, async (req, res) => {
    try {

        const email = req?.email;
        if (!email) {
            return res.send(401).json({ message: "Request does not have an email." });
        }

        const account = await UserModel.findOne({ email: email }, { _id: 0, password: 0, uuid: 0, refreshToken: 0 });
        if (!account) return res.send(400).json({ message: "Account not found with given information." });


        const authHeader = req.headers.authorization || req.headers.Authorization;;
        const token = authHeader.split(' ')[1];

        res.status(200).json({
            email: account.email,
            joined: account.joined,
            uuid: account.uuid,
            friends: account.friends
        });

    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});





router.get('/logout', async (req, res) => {
    console.log("logout called");
    const cookies = req.cookies;
    if (!cookies?.refreshjwt) return res.status(204).json({ message: "No cookies send with request." }); //No content
    const refreshToken = cookies?.refreshjwt;

    console.log("here?");

    const account = await UserModel.findOne({ refreshToken: refreshToken });
    res.clearCookie("accessjwt", { httpOnly: true, sameSite: "None", secure: true });
    res.clearCookie("refreshjwt", { httpOnly: true, sameSite: "None", secure: true });
    if (!account) {
        return res.sendStatus(204);
    }

    account.refreshToken = "";
    account.save().then(() => {
        res.status(204).json({ message: "User Successfully Logged Out" });
        console.log("user logged out");
    },
        (err) => {
            console.log(err);
            res.status(err.status || 400).json({ message: err.message });
            return;

        })




});


router.post("/addfriend", verifyJWT, async (req, res) => {
    const { sender, reciever } = req.body;

    if (!reciever) return res.status(400).json({ message: "Friendee not found" });

    // check existance
    const friender = await UserModel.findOne({ email: sender });
    if (!friender) return res.status(400).json({ message: "Friender not found" });

    const friendee = await UserModel.findOne({ email: reciever });
    if (!friendee) return res.status(400).json({ message: "Friendee not found" });

    // check if already friends
    let alreadyFriends = false;
    friendee?.friends.forEach((friend) => {
        console.log(friender.email)
        console.log(friend.email)
        if (friender?.email == friend.email) {
            console.log(" already friends!")
            alreadyFriends = true;
        }
    })

    if (alreadyFriends) res.status(400).json({ message: "Friend Request Already Sent" });


    friendee?.friends?.push({
        email: friender.email,
        status: "Recieved"
    })

    friender?.friends?.push({
        email: friendee.email,
        status: "Sent"
    })

    friendee.save().then(() => {
        // res.status(201).json({ message: "New User Successfully Saved" });
    },
        (err) => {
            const errs = err?.errors
            const keys = Object.keys(err?.errors);
            const msg = errs[keys[0]]?.properties?.message;
            res.status(err.status || 400).json({ message: msg || err?.message });
            return;

        })

    friender.save().then(() => {
        res.status(200).json({ message: "Friend Request Sent" });
    },
        (err) => {
            const errs = err?.errors
            const keys = Object.keys(err?.errors);
            const msg = errs[keys[0]]?.properties?.message;
            res.status(err.status || 400).json({ message: msg || err?.message });
            return;

        })


})





router.get("/getFriendData/:user", verifyJWT, async (req, res) => {

    const user = await UserModel.findOne({ uuid: req.params.user });
    if (!user) return res.status(400).json({ message: "Inital User not found" });

    let acceptedFriends = []
    let sentFriends = []
    let recievedFriends = []
    let pending_friends = []

    const friends = user.friends;
    console.log(friends)
    try {
        for (index in friends) {
            console.log(index)
            const friendAccount = await UserModel.findOne({ email: friends[index].email }, { _id: 0, password: 0, uuid: 0, refreshToken: 0, friends: 0 });
            if (!friendAccount) continue;
            if (friends[index].status == "Recieved") recievedFriends.push({ ...friendAccount._doc });
            else if (friends[index].status == "Sent") sentFriends.push({ ...friendAccount._doc });
            else acceptedFriends.push({ ...friendAccount._doc });
        }
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({ message: "There was an issue getting friend data." });
    }

    console.log("accepted friends", acceptedFriends);
    console.log("sent friends", sentFriends);
    console.log("recieved friends", recievedFriends);

    res.status(200).json({ acceptedFriends: acceptedFriends, sentFriends: sentFriends, recievedFriends: recievedFriends });

})



router.post("/acceptfriend", verifyJWT, async (req, res) => {
    const { sender, reciever } = req.body;

    if (!reciever) return res.status(400).json({ message: "Friendee not found" });

    // check existance
    const friender = await UserModel.findOne({ email: sender });
    if (!friender) return res.status(400).json({ message: "Friender not found" });

    const friendee = await UserModel.findOne({ email: reciever });
    if (!friendee) return res.status(400).json({ message: "Friendee not found" });

    // check if no request 
    let alreadyFriends = false;
    friendee?.friends.forEach((friend) => {
        console.log(friender.email)
        console.log(friend.email)
        if (friender?.email == friend.email) {
            console.log(" already friends!")
            alreadyFriends = true;
        }
    })

    if (!alreadyFriends) return res.status(400).json({ message: "No Friend Request Sent" });

    for (index in friendee?.friends) {
        if (friendee?.friends[index].email == friender.email) {
            friendee.friends[index].status = "Accepted";
            break;
        }
    }
    for (index in friender?.friends) {
        if (friender?.friends[index].email == friendee.email) {
            friender.friends[index].status = "Accepted";
            break;
        }
    }


    friendee.save().then(() => {
    },
        (err) => {
            const errs = err?.errors
            const keys = Object.keys(err?.errors);
            const msg = errs[keys[0]]?.properties?.message;
            res.status(err.status || 400).json({ message: msg || err?.message });
            return;

        })

    friender.save().then(() => {
        // return res.status(200).json({ message: "Friends Accepted" });
    },
        (err) => {
            const errs = err?.errors
            const keys = Object.keys(err?.errors);
            const msg = errs[keys[0]]?.properties?.message;
            res.status(err.status || 400).json({ message: msg || err?.message });
            return;

        })

    res.status(200).json({ message: "Friends Accepted" });


})


module.exports = router;

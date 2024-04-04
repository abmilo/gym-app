


// router.get('/getUser', verifyJWT, async (req, res) => {
//     try {

//         const email = req?.email;
//         if (!email) {
//             return res.send(401).json({ message: "Request does not have an email." });
//         }

//         const account = await UserModel.findOne({ email: email }, { _id: 0, password: 0, uuid: 0, refreshToken: 0 });
//         if (!account) return res.send(400).json({ message: "Account not found with given information." });


//         const authHeader = req.headers.authorization || req.headers.Authorization;;
//         const token = authHeader.split(' ')[1];

//         res.status(200).json({
//             email: account.email,
//             joined: account.joined,
//             uuid: account.uuid,
//             friends: account.friends
//         });

//     }
//     catch (err) {
//         console.log(err);
//         res.sendStatus(400);
//     }
// });
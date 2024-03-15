const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;;
    if (!authHeader) {
        console.log("Request does not have header.")
        return res.sendStatus(401);
    }
    // console.log("headers exist");
    // console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("This is not a valid access token.")
                return res.status(403).json({ message: "This is not a valid access token." });
            }
            req.email = decoded?.email;
            console.log("request passes jwt verification");
            next();
        }
    );
}

module.exports = verifyJWT;
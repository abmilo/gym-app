const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require('dotenv').config();



// attatch proper headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header(
    //     'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    // );
    res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser);



app.use(cors(corsOptions));



app.get('/', function (req, res) {
    console.log("hit");
    res.send('home, unprotected');
});
app.listen(port, () => {
    console.log(`backend is running on port: ${port}`);
})
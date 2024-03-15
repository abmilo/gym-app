const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require('dotenv').config();
const cookieParser = require('cookie-parser')

// apply initial middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// init port
const port = process.env.PORT || 3001;

// connect to mongo db
const dbURL = process.env.MONGO_URL;
mongoose.connect(dbURL, { dbName: 'proj1', }).then(() => console.log("DB Connected!"));


// attach proper headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});
app.use(cookieParser());


// apply cors rules
app.use(cors(corsOptions));



// routes
app.use('/users', require('./routes/users'));


app.get('/', function (req, res) {
    res.send('home, unprotected');
});


app.get('/auth', function (req, res) {
    res.send('Secured Resource');
});



// server listings
app.listen(port, () => {
    console.log(`backend is running on port: ${port}`);
})
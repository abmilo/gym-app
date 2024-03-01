const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


const port = process.env.PORT || 3001;


const dbURL =
    process.env.MONGO_URL;

mongoose
    .connect(dbURL, {
        dbName: 'proj1',
    })
    .then(() => console.log("DB Connected!"));


app.use('/users', require('./routes/users'));


app.get('/', function (req, res) {
    res.send('home, unprotected');
});


app.get('/auth', function (req, res) {
    res.send('Secured Resource');
});


app.listen(port, () => {
    console.log(`backend is running on port: ${port}`);
})
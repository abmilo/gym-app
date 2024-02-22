const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;

const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: process.env.audience,
    issuerBaseURL: process.env.issuerBaseURL,
    tokenSigningAlg: process.env.tokenSigningAlg
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});


app.listen(port, () => {
    console.log(`backend is running on port: ${port}`);
})
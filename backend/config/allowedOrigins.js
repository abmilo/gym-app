require("dotenv").config();

const allowedOrigins = [
    process.env.ALLOWED_ORIGIN,
];

module.exports = allowedOrigins;


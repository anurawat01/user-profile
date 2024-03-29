const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secret: crypto.randomBytes(64).toString("hex"),
    database: process.env.DB_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};
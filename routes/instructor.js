const express = require('express');
const instructorRouter = express.Router();
const {checkAuth} = require("../utils/auth");

instructorRouter
    .get('/', checkAuth('instructor'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna instructor');
    });

module.exports = {
    instructorRouter,
}
const express = require('express');
const instructorAccountRouter = express.Router();
const {checkAuth} = require("../utils/auth");

instructorAccountRouter
    .get('/', checkAuth('instructor'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna instructor');
    });

module.exports = {
    instructorAccountRouter,
}
const express = require('express');
const participantAccountRouter = express.Router();
const {checkAuth} = require("../utils/auth");

participantAccountRouter
    .get('/', checkAuth('participant'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna participant');
    });

module.exports = {
    participantAccountRouter: participantAccountRouter
}
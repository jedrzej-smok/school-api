const express = require('express');
const participantRouter = express.Router();
const {checkAuth} = require("../utils/auth");

participantRouter
    .get('/', checkAuth('participant'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna participant');
    });

module.exports = {
    participantRouter,
}
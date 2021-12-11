const express = require('express');
const adminRouter = express.Router();
const {checkAuth} = require("../utils/auth");

adminRouter
    .get('/', checkAuth('admin'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna admin');
    });

module.exports = {
    adminRouter,
}
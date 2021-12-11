const express = require('express');
const homeRouter = express.Router();


homeRouter
    .get('/',  (req, res) => {
        res
            .cookie('role','guest')
            .status(200)
            .send('Strona główna');
    });

module.exports = {
    homeRouter,
}
require('dotenv').config()
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

// 
const db = require("./mainDB/models/index");
const {testDBconnection} = require("./test");







(async () => {
    await testDBconnection(db);
    await db.sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
})();




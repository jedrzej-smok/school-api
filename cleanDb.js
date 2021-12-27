require('dotenv').config()
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const express = require('express');
// const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')

//local requires
const db = require("./mainDB/models/index");
const {testDBconnection} = require("./test");

//db connection, models synchronization
async function createDB(){
    const testDB = await testDBconnection(db);
    const syncDB = await db.sequelize.sync({force:true});
    await Promise.all([testDB,syncDB]);
    console.log("All models were synchronized successfully.");
};


createDB()
    .then(()=>{
        console.log('DB was cleaned');
    })
    .catch((e) => console.log(e));




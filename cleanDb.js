require('dotenv').config()
const { exec } = require("child_process");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const express = require('express');
// const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')

//local requires
const db = require("./mainDB/models/index");
const {testDBconnection} = require("./test");
const { stderr } = require('process');

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
        exec("npx sequelize-cli db:seed:all",(error, stdout,stderr)=>{
            if (error) {
                console.log(`error: ${error.message}`);
                return 1;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log('DB was recreated...');
        })
    })
    .catch((e) => console.log(e));




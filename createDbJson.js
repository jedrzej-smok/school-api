'use strict';
require('dotenv').config()
const fs = require('fs');

const databaseJSON = {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "dialect": "mysql" 
    }
  }
const data = JSON.stringify(databaseJSON);
fs.writeFileSync('./configDatabase.json', data);
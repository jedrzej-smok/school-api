const express = require('express');
const execProcedureFunctionRouter = express.Router();
const mysql = require('mysql2/promise');

const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundInstructorNameError, NotFoundCourseNameError, NotFoundAssignmentNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");


async function query(sql, params) {
    const connection = await mysql.createConnection({
        host:process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    });
    const [results, ] = await connection.execute(sql, params);
    return results;
}

execProcedureFunctionRouter
    .post('/procedure', checkAuth('instructor'), async (req, res) => {
        const course = await db.Course.findOne({
            where:{
                name: req.body.name
            },
            attributes:['name','courseId']
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }
        const rows = await query('CALL p1(?)',[course.courseId]);
        console.log(rows)
        res
            .status(200)
            .send({message:`affectedRows: ${rows.affectedRows}`});
    })
    .get('/function', checkAuth('instructor'), async (req, res) => {
        
        const rows = await query('SELECT email, COALESCE(f1(instructorId),0) AS earnings FROM instructors WHERE isAdmin=0 ORDER BY instructorId',[]);
        console.log(rows)
        res
            .status(200)
            .send(JSON.stringify(rows))
    })

module.exports = {
    execProcedureFunctionRouter: execProcedureFunctionRouter
}

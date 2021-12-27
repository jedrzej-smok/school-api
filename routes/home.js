const express = require('express');
const homeRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

homeRouter
    .get('/',  (req, res) => {
        res
            .cookie('role','guest')
            .status(200)
            // .redirect('/main.html');
            .sendFile('main.html', {root:"../DanceSchool"});
    })
    .get('/course',checkAuth('guest'), async function(req, res, next)  {
        try{
            // Find all courses
            const courses = await db.Course.findAll({
                attributes:['courseId','name','price','numberClasses','startTime','requirements', 'roomId', 'songId', 'levelId', 'danceGenreId'],
                order:['courseId'],
                include:[db.Room, db.Song, db.Level, db.DanceGenre]
            });
            
            const resCourses = await Promise.all(courses.map(async (course) => {
                    const assignments = await course.getAssignments();

                    const instructors = await Promise.all(assignments.map(async(assignment) => {
                            const instructor = await db.Instructor.findOne({
                                where:{
                                    instructorId: assignment.instructorId
                                },
                                attributes:['email']
                            });
                            return instructor.email;
                        })
                    );
                    return {
                        name: course.name,
                        price: course.price,
                        numberClasses: course.price,
                        startTime: course.startTime,
                        requirements: course.requirements,
                        room: course.Room.name,
                        song: course.Song.title,
                        level: course.Level.name,
                        danceGenre: course.DanceGenre.name,
                        instructors: instructors
                    };
                })
            );
            console.log('resCourses:', resCourses);

            res
                .status(200)
                .send(JSON.stringify(resCourses));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })

module.exports = {
    homeRouter,
}
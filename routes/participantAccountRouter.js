const express = require('express');
const participantAccountRouter = express.Router();
const {checkAuth} = require("../utils/auth");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundParticipantNameError, NotFoundRecordingNameError, NotFoundCourseNameError, NotFoundInstructorNameError} = require("../utils/errors");


participantAccountRouter
    .get('/', checkAuth('participant'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna participant');
    })
    .get('/registration',checkAuth('participant'), async function(req, res, next)  {
        try{
            // registration by participant

            const participant = await db.Participant.findByPk(req.cookies.userId);
            if(!participant){
                throw new NotFoundParticipantNameError();
            }
            const registrations = await participant.getRegistrations();
            const resRegistrations = await Promise.all(registrations.map(async (registration)=>{
                    return {
                        course:(await registration.getCourse()).name,
                        attendance: registration.attendance,
                        registrationId: registration.registrationId
                    };
                })
            );
            
            console.log("All participant's registrations:", JSON.stringify(resRegistrations));
            res
                .status(200)
                .send(JSON.stringify(resRegistrations));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/course',checkAuth('participant'), async function(req, res, next)  {
        try{
            // registration by participant

            const participant = await db.Participant.findByPk(req.cookies.userId);
            if(!participant){
                throw new NotFoundParticipantNameError();
            }
            const registrations = await participant.getRegistrations();
            const resRegistrations = await Promise.all(registrations.map(async (registration)=>{
                    return (await registration.getCourse()).name;
                })
            );
            
            console.log("All participant's courses:", JSON.stringify(resRegistrations));
            res
                .status(200)
                .send(JSON.stringify(resRegistrations));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .post('/course/one/',checkAuth('participant'), async function(req, res, next)  {
        try{
            const {byName} = req.body;
            const course = await db.Course.findOne({
                where :{
                    name: byName
                },
                attributes:['courseId','name','price','numberClasses','startTime','requirements', 'roomId', 'songId', 'levelId', 'danceGenreId'],
                order:['courseId'],
                include:[db.Room, db.Song, db.Level, db.DanceGenre]
            });
            if(!course){
                throw new NotFoundCourseNameError();
            }
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
            
            const recordings = await course.getRecordings();
    
            
    
            const resCourse  = {
                name: course.name,
                price: course.price,
                numberClasses: course.numberClasses,
                startTime: course.startTime,
                requirements: course.requirements,
                room: course.Room.name,
                song: course.Song.title,
                level: course.Level.name,
                danceGenre: course.DanceGenre.name,
                instructors: instructors,
                recordings: recordings.map(recording => {
                    return {
                        'id': recording.danceRecordingId,
                        'name': recording.name,
                        'source': recording.source
                    };
                })
            };
            
            res
                .status(200)
                .send(JSON.stringify(resCourse));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .post('/course/recording/',checkAuth('participant'), async function(req, res, next)  {
        try{
            const {byName} = req.body;
            const course = await db.Course.findOne({
                where :{
                    name: byName
                },
                attributes:['courseId']
            });
            if(!course){
                throw new NotFoundCourseNameError();
            }
            const recordings = await course.getRecordings();
    
            
    
            const resCourse  = recordings.map(recording => {
                return {
                    // 'id': recording.danceRecordingId,
                    'name': recording.name,
                    'source': recording.source
                };
            })
            
            res
                .status(200)
                .send(JSON.stringify(resCourse));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })
module.exports = {
    participantAccountRouter: participantAccountRouter
}
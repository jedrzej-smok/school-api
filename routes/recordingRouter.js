const express = require('express');
const recordingRouter = express.Router();
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundCourseNameError, NotFoundRecordingNameError, SameRecordingNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");


recordingRouter
//read
.get('/recording',checkAuth('instructor'), async function(req, res, next)  {
    try{
        // Find all songs
        const recordings = await db.Recording.findAll({
            attributes:['name','source','courseId','danceRecordingId'],
            order:['danceRecordingId'],
            include: db.Course
        });
        const resRecordings = recordings.map((recording) => {
            return {
                recordingId: recording.danceRecordingId,
                name: recording.name,
                source: recording.source,
                course: recording.Course.name
            };
        })
        console.log("All recordings:", JSON.stringify(resRecordings));
        res
            .status(200)
            .send(JSON.stringify(resRecordings));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.post('/recording/filter',checkAuth('instructor'), async function(req, res, next)  {
    try{
        const {name}=req.body;
        const recordings = await db.Recording.findAll(
            {where:{
                name:{
                    [Op.startsWith]:name
                }
            },
            attributes:['name','source','courseId','danceRecordingId'],
            order:['danceRecordingId'],
            include: db.Course
        });
        const resRecordings = recordings.map((recording) => {
            return {
                recordingId: recording.danceRecordingId,
                name: recording.name,
                source: recording.source,
                course: recording.Course.name
            };
        })
        console.log("All recordings:", JSON.stringify(resRecordings));
        res
            .status(200)
            .send(JSON.stringify(resRecordings));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.post('/recording/oneCourse',checkAuth('instructor'), async function(req, res, next)  {
    try{
        //  course's recordings 
        const {name} = req.body;
        const course = await db.Course.findOne({
            where:{
                name:name
            },
            attributes:['name','courseId'],
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }
        const  recordings = await course.getRecordings();
        const resRecording = recordings.map((recording) => {
            return{
                recordingId: recording.danceRecordingId,
                name: recording.name,
                source: recording.source
            };
        });    
        res
            .status(200)
            .send(JSON.stringify(resRecording));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/recording/form/add',checkAuth('instructor'), async function(req, res, next){
    res.send('Form add recording');
})
.post('/recording',checkAuth('instructor'), async function(req, res, next)  {
    try{
        //recording create
        const {name, source,courseName} = req.body;
        const course = await db.Course.findOne({
            where:{
                name: courseName
            },
            attributes:['courseId']
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }
        const countRecording = await db.Recording.count({
            where:{
                name: name,
                courseId: course.courseId
            }
         });
        if(countRecording>0){
            throw new SameRecordingNameError();
        }
        const recording = await db.Recording.create({
            name: name,
            source:source,
            courseId: course.courseId
        });
        console.log("recording created:");
        res
            .status(200)
            .send(JSON.stringify(
                {
                    name: recording.name,
                    source: recording.source,
                    course: courseName
                })
            );        
    }catch(err){
        next(err);
    }
    
})
//update
.post('/recording/form/edit',checkAuth('instructor'), async function(req, res, next){
    try{
        // recording by title
        const {recordingName, courseName} = req.body;
        const course = await db.Course.findOne({
            where:{
                name: courseName
            },
            attributes:['courseId']
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }
        const recording = await db.Recording.findOne({
            where:{
                name: recordingName
            },
            attributes:['danceRecordingId','name','source']
        });
        if(!recording){
            throw new NotFoundRecordingNameError();
        }
        resRecording = {
            recordingId: recording.danceRecordingId,
            name: recording.name,
            source: recording.source,
            course: courseName
        };
        console.log("One recording to edit:", JSON.stringify(resRecording));
        res
            .status(200)
            .send(JSON.stringify(resRecording));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.put('/recording',checkAuth('instructor'), async function(req, res, next)  {
    try{
        const {recordingId, name, source, courseName} = req.body;
        const course = await db.Course.findOne({
            where:{
                name: courseName
            },
            attributes:['courseId']
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }

        const countRecording = await db.Recording.count({
            where:{
                name: name,
                courseId: course.courseId,
                danceRecordingId:{[Op.ne]: recordingId}
            }
         });
        if(countRecording>0){
            throw new SameRecordingNameError();
        }

        const tmp = await db.Recording.update({name: name, source: source, courseId: course.courseId},{
            where:{
                danceRecordingId: recordingId
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({
                    message:`${tmp} recording modified`
                });
        }else{
            res
                .status(404)
                .send({
                    message:`${tmp} recording modified, Invalid recordingId`
                });
        }

    }catch(err){
        next(err);
    }  
})
//delete
.delete('/recording',checkAuth('instructor'), async function(req, res, next)  {
    try{
        const tmp = await db.Recording.destroy({
            where:{
                danceRecordingId: req.body.recordingId
            }
        });
    
        if(tmp>0){
            res
                .status(200)
                .send({
                    message:`${tmp} recording deleted`
                });
        }else{
            res
                .status(404)
                .send({
                    message:`${tmp} recording deleted, Invalid recordingId`
                });
        }

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    recordingRouter: recordingRouter,
}
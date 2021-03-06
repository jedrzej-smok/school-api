const express = require('express');
const assignmentRouter = express.Router();
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundInstructorNameError, NotFoundCourseNameError, NotFoundAssignmentNameError,ExtraError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

assignmentRouter
    //read
    .get('/assignment',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all assignments
            const instructors = await db.Instructor.findAll({
                attributes:['email','instructorId'],
                order:['instructorId']
            });
            let resAssignments = [];
            for (const instructor of instructors) {
                const assignments = await instructor.getAssignments();
                for (const assignment of assignments) {
                    resAssignments.push({
                        'instructor': instructor.email,
                        'course': (await assignment.getCourse()).name,
                        'earnings': assignment.earnings
                    });
                }
            }
            console.log("All assignments:", JSON.stringify(resAssignments));
            res
                .status(200)
                .send(JSON.stringify(resAssignments));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .post('/assignment/filter',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all assignments
            const instructors = await db.Instructor.findAll({
                where:{
                    email:{
                        [Op.startsWith]:req.body.email
                    }
                },
                attributes:['email','instructorId'],
                order:['instructorId']
            });
            let resAssignments = [];
            for (const instructor of instructors) {
                const assignments = await instructor.getAssignments();
                for (const assignment of assignments) {
                    resAssignments.push({
                        'instructor': instructor.email,
                        'course': (await assignment.getCourse()).name,
                        'earnings': assignment.earnings
                    });
                }
            }
            console.log("All assignments:", JSON.stringify(resAssignments));
            res
                .status(200)
                .send(JSON.stringify(resAssignments));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/assignment/oneInstructor',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // assignment by instructor
            
            const instructor = await db.Instructor.findByPk(req.cookies.userId);
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const assignments = await instructor.getAssignments();
            const resAssignments = await Promise.all(assignments.map(async (assignment)=>{
                    return {
                        course:(await assignment.getCourse()).name,
                        earnings: assignment.earnings
                    };
                })
            );
            
            console.log("All instructor's assignments:", JSON.stringify(resAssignments));
            res
                .status(200)
                .send(JSON.stringify(resAssignments));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    
    //create, more add
    .get('/assignment/form/add',checkAuth('instructor'), async function(req, res, next){
        res.send('Form add assignment');
    })
    .post('/assignment',checkAuth('instructor'), async function(req, res, next)  {
        try{
            
            //instructorAndGenre create
            const {instructorEmail, courseName, earnings} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: instructorEmail
                },
                attributes:['email','instructorId'],
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const course = await db.Course.findOne({
                where:{
                    name: courseName
                },
                attributes:['courseId','name','price','numberClasses','startTime','requirements', 'roomId', 'songId', 'levelId', 'danceGenreId'],
                include:[db.DanceGenre]
            });
            if(!course){
                throw new NotFoundCourseNameError();
            }
            const danceGenres = await instructor.getDanceGenres();
            let flag = 0;
            for (const danceGenre of danceGenres) {
                if(danceGenre.name == course.DanceGenre.name){
                    flag +=1;
                }
            }
            if(flag == 0){
                throw new ExtraError();
            }

            const [assignment, created] = await db.Assignment.findOrCreate({
                where:{
                    courseId: course.courseId,
                    instructorId: instructor.instructorId
                },
                defaults:{
                    earnings: earnings,
                }
            });
            if(!created){
                console.log('Assigment already existed')
                res
                    .status(400)
                    .send('Assigment already existed');
            }else{
                console.log("assignment added to instrcutor and course:");
                res
                    .status(200)
                    .send(JSON.stringify(
                        {
                            earnings: assignment.earnings,
                            instructor: instructorEmail,
                            course: courseName
                        })
                    );
            }
            //niepotrzebne musze byc przy tworzeniu bo sa not null
            // await instructor.addAssignment(assignment);
            // await course.addAssignment(assignment);
            
        }catch(err){
            next(err);
        }

    })
    //update
    .post('/assignment/form/edit',checkAuth('instructor'), async function(req, res, next){
       
        try{
            const {instructorEmail, courseName} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: instructorEmail
                },
                attributes:['email','instructorId'],
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const course = await db.Course.findOne({
                where:{
                    name: courseName
                },
                attributes:['name','courseId']
            });
            if(!course){
                throw new NotFoundCourseNameError();
            }
    
            const assignment = await db.Assignment.findOne({
                where:{
                    courseId: course.courseId,
                    instructorId: instructor.instructorId
                }
            });

            if(!assignment){
                throw new NotFoundAssignmentNameError();
            }
            resAssignment = {
                earnings: assignment.earnings,
                instructor: instructor.email,
                course: course.name
            };
            console.log("One assignment to edit:", JSON.stringify(resAssignment));
            res
                .status(200)
                .send(JSON.stringify(resAssignment));
    
        }catch(err){
            console.log(err);
            next(err);
        }

    })
    .put('/assignment',checkAuth('instructor'), async function(req, res, next)  {
        try{
            const {instructorEmail, courseName, earnings,instructorEmailNew, courseNameNew} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: instructorEmail
                },
                attributes:['instructorId'],
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const course = await db.Course.findOne({
                where:{
                    name: courseName
                },
                attributes:['courseId']
            });
            if(!course){
                throw new NotFoundCourseNameError();
            }
            const instructorNew = await db.Instructor.findOne({
                where:{
                    email: instructorEmailNew
                },
                attributes:['instructorId'],
            });
            if(!instructorNew){
                throw new NotFoundInstructorNameError();
            }
            const courseNew = await db.Course.findOne({
                where:{
                    name: courseNameNew
                },
                attributes:['courseId','name','price','numberClasses','startTime','requirements', 'roomId', 'songId', 'levelId', 'danceGenreId'],
                include:[db.DanceGenre]
            });
            if(!courseNew){
                throw new NotFoundCourseNameError();
            }
            
            const danceGenres = await instructorNew.getDanceGenres();
            let flag = 0;
            
            for (const danceGenre of danceGenres) {
                console.log(danceGenre.name);
                if(danceGenre.name == courseNew.DanceGenre.name){
                    flag +=1;
                }
            }
            if(flag == 0){
                throw new ExtraError();
            }
            const assignment = await db.Assignment.findOne({
                where:{
                    courseId: course.courseId,
                    instructorId: instructor.instructorId
                }
            });
            if(!assignment){
                throw new NotFoundAssignmentNameError();
            }
            const assignmentDouble = await db.Assignment.findOne({
                where:{
                    courseId: courseNew.courseId,
                    instructorId: instructorNew.instructorId
                }
            });
            if(assignmentDouble){
                if(assignmentDouble.assignmentId != assignment.assignmentId){
                    res
                        .status(400)
                        .send({
                            message:  `assignment already exists`  
                        });
                    return;
                }
                
            }
            const tmp = await db.Assignment.update({earnings: earnings, courseId: courseNew.courseId, instructorId: instructorNew.instructorId },{
                where:{
                    assignmentId: assignment.assignmentId
                }
            });
            if(tmp>0){
                res
                    .status(200)
                    .send({
                        message: `${tmp} assignment modified`  
                    });
            }else{
                res
                    .status(404)
                    .send({
                        message: `${tmp} assignment modified`  
                    });
            }
    
        }catch(err){
            next(err);
        }  
    })
    //delete remove
    .delete('/assignment',checkAuth('instructor'), async function(req, res, next)  {
        try{
            
            
            const {instructorEmail, courseName} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: instructorEmail
                },
                attributes:['email','instructorId'],
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const course = await db.Course.findOne({
                where:{
                    name: courseName
                },
                attributes:['courseId']
            });
            if(!course){
                throw new NotFoundCourseNameError();
            }
            const tmp = await db.Assignment.destroy({
                where:{
                    instructorId: instructor.instructorId,
                    courseId: course.courseId
                }
            });
            
            if(tmp>0){
                res
                    .status(200)
                    .send({
                        message: `${tmp} assignment deleted`  
                    });
            }else{
                res
                    .status(404)
                    .send({
                        message: `${tmp} assignment deleted`  
                    });
            }
            

            
        }catch(err){
            next(err);
        }
    })

module.exports = {
    assignmentRouter: assignmentRouter,
}
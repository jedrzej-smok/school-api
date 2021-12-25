const express = require('express');
const registrationRouter = express.Router();
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundParticipantNameError, NotFoundCourseNameError, NotFoundRegistrationNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

registrationRouter
    //read
    .get('/registration',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all registrations
            const participants = await db.Participant.findAll({
                attributes:['email','participantId'],
                order:['participantId']
            });
            let resRegistrations = [];
            for (const participant of participants) {
                const registrations = await participant.getRegistrations();
                for (const registration of registrations) {
                    resRegistrations.push({
                        'participant': participant.email,
                        'course': (await registration.getCourse()).name
                    });
                }
            }
            console.log("All registrations:", JSON.stringify(resRegistrations));
            res
                .status(200)
                .send(JSON.stringify(resRegistrations));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/registration/oneParticipant',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // registration by participant

            const participant = await db.Participant.findOne({
                where:{
                    email:req.body.email
                },
                attributes:['email','participantId']
            });
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
            
            console.log("All instructor's registrations:", JSON.stringify(resRegistrations));
            res
                .status(200)
                .send(JSON.stringify(resRegistrations));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    
    //create, more add
    .get('/registration/form/add',checkAuth('instructor'), async function(req, res, next){
        res.send('Form add registration');
    })
    .post('/registration',checkAuth('instructor'), async function(req, res, next)  {
        try{
            
            //registration create
            const {participantEmail, courseName, attendance} = req.body;
            const participant = await db.Participant.findOne({
                where:{
                    email: participantEmail
                },
                attributes:['email','participantId'],
            });
            if(!participant){
                throw new NotFoundParticipantNameError();
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

            const [registration, created] = await db.Registration.findOrCreate({
                where:{
                    courseId: course.courseId,
                    participantId: participant.participantId
                },
                defaults:{
                    attendance: attendance,
                }
            });
            if(!created){
                console.log('Registration already existed')
                res
                    .status(400)
                    .send('Registration already existed');
            }else{
                console.log("registration added to instrcutor and course:");
                res
                    .status(200)
                    .send(JSON.stringify(
                        {
                            attendance: registration.attendance,
                            participant: participantEmail,
                            course: courseName
                        })
                    );
            }
            //niepotrzebne musze byc przy tworzeniu bo sa not null
            // await instructor.addRegistration(registration);
            // await course.addRegistration(registration);
            
        }catch(err){
            next(err);
        }

    })
    //update
    .get('/registration/form/edit',checkAuth('instructor'), async function(req, res, next){
       
        try{
            const {participantEmail, courseName} = req.body;
            const participant = await db.Participant.findOne({
                where:{
                    email: participantEmail
                },
                attributes:['email','participantId'],
            });
            if(!participant){
                throw new NotFoundParticipantNameError();
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
    
            const registration = await db.Registration.findOne({
                where:{
                    courseId: course.courseId,
                    participantId: participant.participantId
                }
            });

            if(!registration){
                throw new NotFoundRegistrationNameError();
            }
            resRegistration = {
                registrationId: registration.registrationId,
                attendance: registration.attendance,
                participant: participant.email,
                course: course.name
            };
            console.log("One registration to edit:", JSON.stringify(resRegistration));
            res
                .status(200)
                .send(JSON.stringify(resRegistration));
    
        }catch(err){
            console.log(err);
            next(err);
        }

    })
    .put('/registration',checkAuth('instructor'), async function(req, res, next)  {
        try{
            const {registrationId, attendance} = req.body;

            const tmp = await db.Registration.update({attendance: attendance},{
                where:{
                    registrationId: registrationId
                }
            });
            if(tmp>0){
                res
                    .status(200)
                    .send({message:`${tmp} registration modified`});
            }else{
                res
                    .status(404)
                    .send({message:`${tmp} registration modified, Invalid registerId`});
            }
            
    
        }catch(err){
            next(err);
        }  
    })
    //delete remove
    .delete('/registration',checkAuth('instructor'), async function(req, res, next)  {
        try{
            const {registrationId} = req.body;

            const tmp = await db.Registration.destroy({
                where:{
                    registrationId: registrationId
                }
            });
            
            console.log(`${tmp} registration deleted`);
            if(tmp>0){
                res
                    .status(200)
                    .send({message:`${tmp} registration deleted`});
            }else{
                res
                    .status(404)
                    .send({message:`${tmp} registration deleted, Invalid registerId`});
            }
            
        }catch(err){
            next(err);
        }
    })

module.exports = {
    registrationRouter: registrationRouter,
}
const express = require('express');
const participantRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundParticipantNameError,SameParticipantNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");


participantRouter
//read
.get('/participant',checkAuth('instructor'), async function(req, res, next)  {
    try{
        // Find all participants
        const participants = await db.Participant.findAll({
            attributes:['email','password','name','surname'],
            order:['participantId']
        });
        
        console.log("All participants:", JSON.stringify(participants));
        res
            .status(200)
            .send(JSON.stringify(participants));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/participant/one',checkAuth('instructor'), async function(req, res, next)  {
    try{
        // participant by email
        const {email} = req.body;
        const participant = await db.Participant.findOne({
            where:{
                email:email
            },
            attributes:['email','password','name','surname']
        });
        if(!participant){
            throw new NotFoundParticipantNameError();
        }
        
        console.log("One participant", JSON.stringify(participant));
        
        res
            .status(200)
            .send(JSON.stringify(participant));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/participant/form/add',checkAuth('instructor'), async function(req, res, next){
    res.send('Form add participant');
})
.post('/participant',checkAuth('instructor'), async function(req, res, next)  {
    try{
        try{
            //participant create
            const {email,password,name,surname} = req.body;
            const countParticpant = await db.Participant.count({
               where:{
                   email: email
               }
            });
            const countInstructor = await db.Instructor.count({
                where:{
                    email: email
                }
            });
            
            if(countParticpant||countInstructor){
                throw new SameParticipantNameError();
            }
            const participant = await db.Participant.create({
                email:email,
                password:password,
                name:name,
                surname:surname
            });
            console.log("participant created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        email: participant.email,
                        password:participant.password,
                        name:participant.name,
                        surname:participant.surname
                    })
                );
    
        }catch(err){
            console.log('wyswitel blad', err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameParticipantNameError;
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/participant/form/edit',checkAuth('instructor'), async function(req, res, next){
    try{
        // participant by email
        const {email} = req.body;
        const participant = await db.Participant.findOne({
            where:{
                email:email
            },
            attributes:['email','password','name','surname'],
        });
        if(!participant){
            throw new NotFoundParticipantNameError();
        }
        
        console.log("One participant to edit:", JSON.stringify(participant));
        res
            .status(200)
            .send(JSON.stringify(participant));

    }catch(err){
        console.log(err);
        next(err);
    }
    
})
.put('/participant',checkAuth('instructor'), async function(req, res, next)  {
    try{
        const {byEmail, email, password,name,surname} = req.body;
        const countParticpant = await db.Participant.count({
            where:{
                email: email
            }
         });
         const countInstructor = await db.Instructor.count({
             where:{
                 email: email
             }
         });
         
         if(countParticpant||countInstructor){
             throw new SameParticipantNameError();
         }
        await db.Participant.update({email: email, password:password, name:name, surname:surname},{
            where:{
                email: byEmail
            }
        });
        res
            .status(200)
            .send('One participant modified');

    }catch(err){
        next(err);
    }  
})
//delete
.delete('/participant',checkAuth('instructor'), async function(req, res, next)  {
    try{
        // instructoparticipant
        const deleted = await db.Participant.destroy({
            where:{
                email: req.body.email
            }
        });
        
        console.log(`deleted ${deleted} participants`);
        res
            .status(200)
            .send(`deleted ${deleted} participants`);

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    participantRouter: participantRouter,
}
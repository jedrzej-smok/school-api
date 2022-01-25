const e = require('express');
const express = require('express');
const userLoginRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundUserNameError, InvalidPasswordError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");
const{comparePassword, hashPassword} = require('../utils/myBcrypt')

userLoginRouter
    .post('/in',checkAuth('guest'), async function(req, res, next)  {
        try{
            const {email, password} = req.body;
            const instructor = await db.Instructor.findOne({where:{email: email}});
            const participant = await db.Participant.findOne({where:{email: email}});
            let role;
            let userId;
            if (instructor === null && participant === null){
                throw new NotFoundUserNameError();
            }
            if(participant){
                if(!await comparePassword(password, participant.password)){
                    throw new InvalidPasswordError();
                }
                else{
                    console.log(participant.name, participant.surname);
                    userId = participant.participantId;
                    role = "participant";
                }
            }
    
            if(instructor){
                if(!await comparePassword(password, instructor.password)){
                    throw new InvalidPasswordError();
                }
                else if (instructor.isAdmin){
                    console.log(instructor.name, instructor.surname);
                    userId = instructor.instructorId;
                    role ="admin";
                }else{
                    console.log(instructor.name, instructor.surname);
                    userId = instructor.instructorId;
                    role ="instructor";
                }
            }
            res.cookie("userId", userId);
            res.cookie("role", role);
            res.send({message:'Logged in'});
        
        } catch(err){
           next(err);
        }
    })
    .post('/check', async function(req, res, next)  {
        try{
            const {email, password} = req.body;
            const instructor = await db.Instructor.findOne({where:{email: email}});
            const participant = await db.Participant.findOne({where:{email: email}});
            let role;
            let userId;
            if (instructor === null && participant === null){
                throw new NotFoundUserNameError();
            }
            if(participant){
                if(!await comparePassword(password, participant.password)){
                    throw new InvalidPasswordError();
                }
                else{
                    console.log(participant.name, participant.surname);
                    userId = participant.participantId;
                    role = "participant";
                }
            }
    
            if(instructor){
                if(!await comparePassword(password, instructor.password)){
                    throw new InvalidPasswordError();
                }
                else if (instructor.isAdmin){
                    console.log(instructor.name, instructor.surname);
                    userId = instructor.instructorId;
                    role ="admin";
                }else{
                    console.log(instructor.name, instructor.surname);
                    userId = instructor.instructorId;
                    role ="instructor";
                }
            }
            
            res.send({message:'Password correct'});
        
        } catch(err){
           next(err);
        }
    })
    .post('/out', async function(req, res, next){

        res
            .clearCookie("userId")
            .cookie("role", "guest")
            .status(200)
            .send({message:'Logged out'});
    });
module.exports = {
    userLoginRouter,
}
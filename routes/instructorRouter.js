const express = require('express');
const instructorRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundInstructorNameError, SameInstructorNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");


instructorRouter
//read
.get('/instructor',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all instructors
        const instructors = await db.Instructor.findAll({
            attributes:['email','password','name','surname','isAdmin'],
            order:['instructorId']
        });
        
        console.log("All instructors:", JSON.stringify(instructors));
        res
            .status(200)
            .send(JSON.stringify(instructors));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.post('/instructor/one',checkAuth('admin'), async function(req, res, next)  {
    try{
        // instructor by email
        const {email} = req.body;
        const instructor = await db.Instructor.findOne({
            where:{
                email:email
            },
            attributes:['email','password','name','surname','isAdmin']
        });
        if(!instructor){
            throw new NotFoundInstructorNameError();
        }
        
        console.log("One instructor", JSON.stringify(instructor));
        
        res
            .status(200)
            .send(JSON.stringify(instructor));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/instructor/form/add',checkAuth('admin'), async function(req, res, next){
    res.send('Form add instructor');
})
.post('/instructor',checkAuth('admin'), async function(req, res, next)  {
    try{
        try{
            //instructor create
            const {email,password,name,surname,isAdmin} = req.body;
            const instructor = await db.Instructor.create({
                email:email,
                password:password,
                name:name,
                surname:surname,
                isAdmin:isAdmin
            });
            console.log("instructor created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        email: instructor.email,
                        password:instructor.password,
                        name:instructor.name,
                        surname:instructor.surname,
                        isAdmin:instructor.isAdmin
                    })
                );
    
        }catch(err){
            console.log('wyswitel blad', err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameInstructorNameError;
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.post('/instructor/form/edit',checkAuth('admin'), async function(req, res, next){
    try{
        // instructor by email
        const {email} = req.body;
        const instructor = await db.Instructor.findOne({
            where:{
                email:email
            },
            attributes:['email','password','name','surname','isAdmin'],
        });
        if(!instructor){
            throw new NotFoundInstructorNameError();
        }
        
        console.log("One instructor to edit:", JSON.stringify(instructor));
        res
            .status(200)
            .send(JSON.stringify(instructor));

    }catch(err){
        console.log(err);
        next(err);
    }
    
})
.put('/instructor',checkAuth('admin'), async function(req, res, next)  {
    try{
        const {byEmail, email, password,name,surname,isAdmin} = req.body;
        const checkInstructor =  await db.Instructor.findOne({where:{email: email}});
        // console.log(`checkInstructor:${checkInstructor}`);
        if(checkInstructor && email!==byEmail){
            throw new SameInstructorNameError();
        }
        const tmp = await db.Instructor.update({email: email, password:password, name:name, surname:surname, isAdmin:isAdmin},{
            where:{
                email: byEmail
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} instructor modified`});

        }else{
            res
                .status(404)
                .send({message:`${tmp} instructor modified, invalid email`});
        }
        

    }catch(err){
        next(err);
    }  
})
//delete
.delete('/instructor',checkAuth('admin'), async function(req, res, next)  {
    try{
        // instructor by email
        const deleted = await db.Instructor.destroy({
            where:{
                email: req.body.email
            }
        });
        if(deleted>0){
            res
                .status(200)
                .send({message:`deleted ${deleted} instructors`});

        }else{
            res
                .status(404)
                .send({message:`deleted ${deleted} instructors, invalid email`});
        }
        console.log(`deleted ${deleted} instructors`);

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    instructorRouter: instructorRouter,
}
const express = require('express');
const instructorRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundInstructorNameError, SameInstructorNameError,AtLeastOneInstructorError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");
const {hashPassword} = require('../utils/myBcrypt');

instructorRouter
//read
.get('/instructor',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all instructors
        const instructors = await db.Instructor.findAll({
            attributes:['email','name','surname','isAdmin'],
            where:{
                // isAdmin: 0
            },
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
.post('/instructor/filter',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all instructors
        const {email} = req.body;
        const instructors = await db.Instructor.findAll({
            attributes:['email','name','surname','isAdmin'],
            where:{
                email:{
                    [Op.startsWith]:email
                }
            },
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
                email:email,
                // isAdmin:0
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
            // const isAdmin = 0;
            const instructor = await db.Instructor.create({
                email:email,
                password: await hashPassword(password),
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
            attributes:['email','name','surname','isAdmin'],
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
        // const isAdmin = 0;
        const checkInstructor =  await db.Instructor.findOne({where:{email: email}});
        // console.log(`checkInstructor:${checkInstructor}`);
        if(checkInstructor && email!==byEmail){
            throw new SameInstructorNameError();
        }
        let tmp;
        if(password != ''){
            tmp = await db.Instructor.update({email: email, password:await hashPassword(password), name:name, surname:surname, isAdmin:isAdmin},{
                where:{
                    email: byEmail,
                    // isAdmin:0
                }
            });
        }else{
            tmp = await db.Instructor.update({email: email, name:name, surname:surname, isAdmin:isAdmin},{
                where:{
                    email: byEmail,
                    isAdmin:0
                }
            });
        }
        
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
        const { count, rows } = await db.Instructor.findAndCountAll({
            where: {
              isAdmin:1
            }
          });
        if(count==1){
            if(rows[0].email === req.body.email){
                throw new AtLeastOneInstructorError();
            }
        }
        const deleted = await db.Instructor.destroy({
            where:{
                email: req.body.email,
                // isAdmin: 0
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
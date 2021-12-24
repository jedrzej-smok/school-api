const express = require('express');
const instructorAndGenreRouter = express.Router();
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundInstructorNameError, NotFoundDanceGenreNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

instructorAndGenreRouter
    //read
    .get('/instructorAndGenre',checkAuth('admin'), async function(req, res, next)  {
        try{
            // Find all instructorAndGenre
            const instructors = await db.Instructor.findAll({
                attributes:['email','instructorId'],
                order:['instructorId']
            });
            let resInstructorAndGenres = [];
            for (const instructor of instructors) {
                const danceGenres = await instructor.getDanceGenres();
                for (const danceGenre of danceGenres) {
                    resInstructorAndGenres.push({
                        'instructor': instructor.email,
                        'danceGenre': danceGenre.name
                    });
                }
            }
            console.log("All instructorsAndGenres:", JSON.stringify(resInstructorAndGenres));
            res
                .status(200)
                .send(JSON.stringify(resInstructorAndGenres));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/instructorAndGenre/oneInstrcutor',checkAuth('admin'), async function(req, res, next)  {
        try{
            // song by title
            const {email} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: email
                },
                attributes:['email','instructorId'],
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }

            let resInstructorAndGenres = [];
            const danceGenres = await instructor.getDanceGenres();
            for (const danceGenre of danceGenres) {
                resInstructorAndGenres.push({
                    danceGenre: danceGenre.name
                });
            }
            console.log("All instructorAndGenres:", JSON.stringify(resInstructorAndGenres));
            res
                .status(200)
                .send(JSON.stringify(resInstructorAndGenres));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/instructorAndGenre/oneDanceGenre',checkAuth('admin'), async function(req, res, next)  {
        try{
            // song by title
            const {name} = req.body;
            const danceGenre = await db.DanceGenre.findOne({
                where:{
                    name:name 
                },
                attributes:['name','danceGenreId'],
            });
            if(!danceGenre){
                throw new NotFoundDanceGenreNameError();
            }

            let resInstructorAndGenres = [];
            const instructors = await danceGenre.getInstructors();
            for (const instrcutor of instructors) {
                resInstructorAndGenres.push({
                    'instructor': instrcutor.email
                });
            }
            console.log("All instructorAndGenres:", JSON.stringify(resInstructorAndGenres));
            res
                .status(200)
                .send(JSON.stringify(resInstructorAndGenres));

        }catch(err){
            console.log(err);
            next(err);
        }
    })
    //create, more add
    .get('/instructorAndGenre/form/add',checkAuth('admin'), async function(req, res, next){
        res.send('Form add instructorAndGenre');
    })
    .post('/instructorAndGenre',checkAuth('admin'), async function(req, res, next)  {
        try{
            
            //instructorAndGenre create
            const {instructorEmail, danceGenreName} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: instructorEmail
                },
                attributes:['instructorId']
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const danceGenre = await db.DanceGenre.findOne({
                where:{
                    name: danceGenreName
                },
                attributes:['danceGenreId']
            });
            if(!danceGenre){
                throw new NotFoundDanceGenreNameError();
            }
            await instructor.addDanceGenre(danceGenre);
            console.log("danceGenre added to instrcutor:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        instructor: instructorEmail,
                        danceGenre: danceGenreName
                    })
                );

            
        }catch(err){
            next(err);
        }

    })
    
    //delete remove
    .delete('/instructorAndGenre',checkAuth('admin'), async function(req, res, next)  {
        try{
            
            //instructorAndGenre create
            const {instructorEmail, danceGenreName} = req.body;
            const instructor = await db.Instructor.findOne({
                where:{
                    email: instructorEmail
                },
                attributes:['instructorId']
            });
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            const danceGenre = await db.DanceGenre.findOne({
                where:{
                    name: danceGenreName
                },
                attributes:['danceGenreId']
            });
            if(!danceGenre){
                throw new NotFoundDanceGenreNameError();
            }
            const tmp = await instructor.removeDanceGenre(danceGenre);
            console.log("danceGenre deleted from instrcutor: " ,tmp);
            res
                .status(200)
                .send(`${tmp} danceGenre were removed from the instrcutor:`);

            
        }catch(err){
            next(err);
        }
    })

module.exports = {
    instructorAndGenreRouter: instructorAndGenreRouter,
}
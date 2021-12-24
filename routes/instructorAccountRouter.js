const express = require('express');
const instructorAccountRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

instructorAccountRouter
    .get('/', checkAuth('instructor'), (req, res) => {
        res
            .status(200)
            .send('Strona glowna instructor');
    })
    .get('/room',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all rooms
            const rooms = await db.Room.findAll({
                attributes:['name'],
                order:['roomId']
            });
            res
                .status(200)
                .send(JSON.stringify(rooms.map(room => room.name)));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/level',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all levels
            const levels = await db.Level.findAll({
                attributes:['name'],
                order:['levelId']
            });
            res
                .status(200)
                .send(JSON.stringify(levels.map((level)=>{
                    return level.name;
                })));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/song',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all songs
            const songs = await db.Song.findAll({
                attributes:['title'],
                order:['songId'],
            });
            res
                .status(200)
                .send(JSON.stringify(songs.map(song => song.title)));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/danceGenre',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // Find all danceGenres
            const danceGenres = await db.DanceGenre.findAll({
                attributes:['name'],
                order:['danceGenreId']
            });
            res
                .status(200)
                .send(JSON.stringify(danceGenres.map(danceGenre => danceGenre.name)));
    
        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .get('/instructorAndGenre',checkAuth('instructor'), async function(req, res, next)  {
        try{
            // instrcutorAndGenre
            const instructor = await db.Instructor.findByPk(req.cookies.userId);
            
            if(!instructor){
                throw new NotFoundInstructorNameError();
            }
            
            const danceGenres = await instructor.getDanceGenres();
            
            res
                .status(200)
                .send(JSON.stringify(danceGenres.map(danceGenre => danceGenre.name)));

        }catch(err){
            console.log(err);
            next(err);
        }
    })

module.exports = {
    instructorAccountRouter,
}
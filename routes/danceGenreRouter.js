const express = require('express');
const danceGenreRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundDanceGenreNameError, SameDanceGenreNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");


danceGenreRouter
//read
.get('/danceGenre',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all danceGenres
        const danceGenres = await db.DanceGenre.findAll({
            attributes:['name'],
            order:['danceGenreId']
        });
        
        console.log("All danceGenres:", JSON.stringify(danceGenres));
        res
            .status(200)
            .send(JSON.stringify(danceGenres));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/danceGenre/one',checkAuth('admin'), async function(req, res, next)  {
    try{
        // danceGenre by name
        const {name} = req.body;
        const danceGenre = await db.DanceGenre.findOne({
            where:{
                name:name
            },
            attributes:['name'],
        });
        if(!danceGenre){
            throw new NotFoundDanceGenreNameError();
        }
        
        console.log("One danceGenre", JSON.stringify(danceGenre));
        
        res
            .status(200)
            .send(JSON.stringify(danceGenre));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/danceGenre/form/add',checkAuth('admin'), async function(req, res, next){
    res.send('Form add danceGenre');
})
.post('/danceGenre',checkAuth('admin'), async function(req, res, next)  {
    try{
        try{
            //danceGenre create
            const {name} = req.body;
            const danceGenre = await db.DanceGenre.create({
                name:name 
            });
            console.log("danceGenre created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        name: danceGenre.name
                    })
                );
    
        }catch(err){
            console.log('wyswitel blad', err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameDanceGenreNameError;
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/danceGenre/form/edit',checkAuth('admin'), async function(req, res, next){
    try{
        // danceGenre by name
        const {name} = req.body;
        const danceGenre = await db.DanceGenre.findOne({
            where:{
                name:name
            },
            attributes:['name'],
        });
        if(!danceGenre){
            throw new NotFoundDanceGenreNameError();
        }
        
        console.log("One danceGenre to edit:", JSON.stringify(danceGenre));
        res
            .status(200)
            .send(JSON.stringify(danceGenre));

    }catch(err){
        console.log(err);
        next(err);
    }
    
})
.put('/danceGenre',checkAuth('admin'), async function(req, res, next)  {
    try{
        const {byName, name} = req.body;
        const checkDanceGenre =  await db.DanceGenre.findOne({where:{name: name}});
        // console.log(`checkDanceGenre:${checkDanceGenre}`);
        if(checkDanceGenre){
            throw new SameDanceGenreNameError();
        }
        await db.DanceGenre.update({name: name},{
            where:{
                name: byName
            }
        });
        res
            .status(200)
            .send('One danceGenre modified');

    }catch(err){
        next(err);
    }  
})
//delete
.delete('/danceGenre',checkAuth('admin'), async function(req, res, next)  {
    try{
        // danceGenre by name
        await db.DanceGenre.destroy({
            where:{
                name: req.body.name
            }
        });
        
        console.log("One danceGenre deleted:");
        res
            .status(200)
            .send('danceGerne deleted');

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    danceGenreRouter: danceGenreRouter,
}
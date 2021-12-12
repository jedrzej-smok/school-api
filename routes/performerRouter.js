const express = require('express');
const performerRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundPerformerNameError, SamePerformerNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

performerRouter
//read
.get('/performer',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all performers
        const performers = await db.Performer.findAll({
            attributes:['name','musicGenre'],
            order:['performerId']
        });
        console.log("All performers:", JSON.stringify(performers));
        res
            .status(200)
            .send(JSON.stringify(performers));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/performer/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // performer by name
        const performer = await db.Performer.findOne({
            where:{
                name: req.params.byName
            },
            attributes:['name','musicGenre']
        });
        if(!performer){
            throw new NotFoundPerformerNameError();
        }
        console.log("One performer", JSON.stringify(performer));
        res
            .status(200)
            .send(JSON.stringify(performer));

    }catch(err){
        next(err);
    }
})
//create
.get('/performer/form/add',checkAuth('admin'), async function(req, res, next){
    res.send('Form add performer');
})
.post('/performer',checkAuth('admin'), async function(req, res, next)  {
    try{
        try{
            //performer create
            const {name, musicGenre} = req.body;
            const performer = await db.Performer.create({
                name: name,
                musicGenre:musicGenre
            });
            console.log("performer created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        name: performer.name,
                        musicGenre: performer.musicGenre
                    })
                );
    
        }catch(err){
            console.log(err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SamePerformerNameError();
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/performer/form/edit/:byName',checkAuth('admin'), async function(req, res, next){
    try{
        // performer by name
        const performer = await db.Performer.findOne({
            where:{
                name: req.params.byName
            },
            attributes:['name','musicGenre']
        });
        if(!performer){
            throw new NotFoundPerformerNameError();
        }
        console.log("One performer to edit:", JSON.stringify(performer));
        res
            .status(200)
            .send(JSON.stringify(performer));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.put('/performer/:byName',checkAuth('admin'), async function(req, res, next)  {
    const {name,musicGenre} = req.body;
    await db.Performer.update({name: name, musicGenre: musicGenre},{
        where:{
            name: req.params.byName
        }
    });
    res
        .status(200)
        .send('One performer modified');
})
//delete
.delete('/performer/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // performer by name
        await db.Performer.destroy({
            where:{
                name: req.params.byName
            }
        });
        
        console.log("One performer deleted:");
        res
            .status(200)
            .send('performer deleted');

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    performerRouter: performerRouter,
}
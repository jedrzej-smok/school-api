const express = require('express');
const levelRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundLevelNameError, SameLevelNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

levelRouter
//read
.get('/level',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all levels
        const levels = await db.Level.findAll({
            attributes:['name'],
            order:['levelId']
        });
        console.log("All levels:", JSON.stringify(levels));
        res
            .status(200)
            .send(JSON.stringify(levels));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/level/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // level by name
        const level = await db.Level.findOne({
            where:{
                name: req.params.byName
            },
            attributes:['name']
        });
        if(!level){
            throw new NotFoundLevelNameError();
        }
        console.log("One level:", JSON.stringify(level));
        res
            .status(200)
            .send(JSON.stringify(level));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/level/form/add',checkAuth('admin'), async function(req, res, next){
    res.send('Form add level');
})
.post('/level',checkAuth('admin'), async function(req, res, next)  {
    try{
        try{
            // level create
            const {name} = req.body;
            const level = await db.Level.create({
                name: name
            });
            console.log("level created:");
            res
                .status(200)
                .send(JSON.stringify(level.name));
    
        }catch(err){
            console.log(err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameLevelNameError();
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/level/form/edit/:byName',checkAuth('admin'), async function(req, res, next){
    try{
        // level by name
        const level = await db.Level.findOne({
            where:{
                name: req.params.byName
            },
            attributes:['name']
        });
        if(!level){
            throw new NotFoundLevelNameError();
        }
        console.log("One level to edit:", JSON.stringify(level));
        res
            .status(200)
            .send(JSON.stringify(level));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.put('/level/:byName',checkAuth('admin'), async function(req, res, next)  {
    const {name} = req.body;
    await db.Level.update({name: name},{
        where:{
            name: req.params.byName
        }
    });
    res
        .status(200)
        .send('One level modified');
})
//delete
.delete('/level/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // level by name
        await db.Level.destroy({
            where:{
                name: req.params.byName
            }
        });
        
        console.log("One level deleted:");
        res
            .status(200)
            .send('Level deleted');

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    levelRouter,
}
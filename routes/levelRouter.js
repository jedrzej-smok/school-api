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
.post('/level/filter',checkAuth('admin'), async function(req, res, next)  {
    try{
        const {name} = req.body;
        const levels = await db.Level.findAll({
            where:{
                name:{
                    [Op.startsWith]:name
                }
            },
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
                .send(JSON.stringify({name: level.name}));
    
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
    try{
        const {name} = req.body;
        const checkLevel =  await db.Level.findOne({where:{name: name}});
        if(checkLevel && name !== req.params.byName){
            throw new SameLevelNameError();
        }
        const tmp = await db.Level.update({name: name},{
            where:{
                name: req.params.byName
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} level modified`});

        }else{
            res
                .status(404)
                .send({message:`deleted ${tmp} level modified, invalid name`});
        }
    }catch(err){
        next(err);
    }
})
//delete
.delete('/level/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // level by name
        const tmp = await db.Level.destroy({
            where:{
                name: req.params.byName
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} level deleted`});

        }else{
            res
                .status(404)
                .send({message:`deleted ${tmp} level deleted, invalid name`});
        }

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    levelRouter,
}
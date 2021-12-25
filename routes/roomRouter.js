const express = require('express');
const roomRouter = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundRoomNameError, SameRoomNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

roomRouter
//read
.get('/room',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all rooms
        const rooms = await db.Room.findAll({
            attributes:['name','capacity'],
            order:['roomId']
        });
        console.log("All rooms:", JSON.stringify(rooms));
        res
            .status(200)
            .send(JSON.stringify(rooms));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/room/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // room by name
        const room = await db.Room.findOne({
            where:{
                name: req.params.byName
            },
            attributes:['name','capacity']
        });
        if(!room){
            throw new NotFoundRoomNameError();
        }
        console.log("One room", JSON.stringify(room));
        res
            .status(200)
            .send(JSON.stringify(room));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/room/form/add',checkAuth('admin'), async function(req, res, next){
    res.send('Form add room');
})
.post('/room',checkAuth('admin'), async function(req, res, next)  {
    try{
        try{
            //room create
            const {name, capacity} = req.body;
            const room = await db.Room.create({
                name: name,
                capacity:capacity
            });
            console.log("room created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        name: room.name,
                        capacity: room.capacity
                    })
                );
    
        }catch(err){
            console.log(err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameRoomNameError();
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/room/form/edit/:byName',checkAuth('admin'), async function(req, res, next){
    try{
        // room by name
        const room = await db.Room.findOne({
            where:{
                name: req.params.byName
            },
            attributes:['name','capacity']
        });
        if(!room){
            throw new NotFoundRoomNameError();
        }
        console.log("One room to edit:", JSON.stringify(room));
        res
            .status(200)
            .send(JSON.stringify(room));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.put('/room/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{ 
        const {name,capacity} = req.body;
        const checkRoom =  await db.Room.findOne({where:{name: name}});
        if(checkRoom && name !== req.params.byName){
            throw new SameRoomNameError();
        }
        const tmp = await db.Room.update({name: name, capacity: capacity},{
            where:{
                name: req.params.byName
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} room were modified`});

        }else{
            res
                .status(404)
                .send({message:`${tmp} room were modified, invalid name`});
        }
        
    }catch(err){
        next(err);
    }
})
//delete
.delete('/room/:byName',checkAuth('admin'), async function(req, res, next)  {
    try{
        // room by name
        const tmp = await db.Room.destroy({
            where:{
                name: req.params.byName
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} rooms were deleted`});

        }else{
            res
                .status(404)
                .send({message:`${tmp} rooms were deleted, invalid name`});
        }

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    roomRouter,
}
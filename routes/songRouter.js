const express = require('express');
const songRouter = express.Router();
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundSongNameError, SameSongNameError, NotFoundPerformerNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

songRouter
//read
.get('/song',checkAuth('admin'), async function(req, res, next)  {
    try{
        // Find all songs
        const songs = await db.Song.findAll({
            attributes:['title','source','performerId'],
            order:['songId'],
            include: db.Performer
        });
        const resSongs = songs.map((song) => {
            return {
                'title': song.title,
                'source': song.source,
                'performer': song.Performer.name
            };
        })
        console.log("All songs:", JSON.stringify(songs));
        res
            .status(200)
            .send(JSON.stringify(resSongs));

    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/song/one',checkAuth('admin'), async function(req, res, next)  {
    try{
        // song by title
        const {title} = req.body;
        const song = await db.Song.findOne({
            where:{
                title: title
            },
            attributes:['title','source','performerId'],
        });
        if(!song){
            throw new NotFoundSongNameError();
        }
        resSong = {
            'title': song.title,
            'source': song.source,
            'performer': (await song.getPerformer()).name
        };
        
        console.log("One song", JSON.stringify(resSong));
        
        res
            .status(200)
            .send(JSON.stringify(resSong));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/song/form/add',checkAuth('admin'), async function(req, res, next){
    res.send('Form add song');
})
.post('/song',checkAuth('admin'), async function(req, res, next)  {
    try{
        try{
            //song create
            const {title, source, performerName} = req.body;
            const performer = await db.Performer.findOne({
                where:{
                    name: performerName
                },
                attributes:['performerId']
            });
            if(!performer){
                throw new NotFoundPerformerNameError();
            }
            const song = await db.Song.create({
                title: title,
                source:source,
                performerId: performer.performerId 
            });
            console.log("song created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        title: song.title,
                        source: song.source,
                        performer: performerName
                    })
                );
    
        }catch(err){
            console.log('wyswitel blad', err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameSongNameError();
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/song/form/edit',checkAuth('admin'), async function(req, res, next){
    try{
        // song by title
        const {title} = req.body;
        const song = await db.Song.findOne({
            where:{
                title: title
            },
            attributes:['title','source','performerId'],
        });
        if(!song){
            throw new NotFoundSongNameError();
        }
        resSong = {
            'title': song.title,
            'source': song.source,
            'performer': (await song.getPerformer()).name
        };
        console.log("One song to edit:", JSON.stringify(resSong));
        res
            .status(200)
            .send(JSON.stringify(resSong));

    }catch(err){
        console.log(err);
        next(err);
    }
    
})
.put('/song',checkAuth('admin'), async function(req, res, next)  {
    try{
        const {byTitle, title, source, performerName} = req.body;
        const performer = await db.Performer.findOne({
            where:{
                name: performerName
            },
            attributes:['performerId']
        });
        if(!performer){
            throw new NotFoundPerformerNameError();
        }
        const checkSong =  await db.Song.findOne({where:{title: title}});
        if(checkSong && byTitle !== title){
            throw new SameSongNameError();
        }
        const tmp = await db.Song.update({title: title, source: source, performerId: performer.performerId},{
            where:{
                title: byTitle
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} songs were modified`});

        }else{
            res
                .status(404)
                .send({message:`${tmp} songs were modified, invalid name`});
        }
        

    }catch(err){
        next(err);
    }  
})
//delete
.delete('/song',checkAuth('admin'), async function(req, res, next)  {
    try{
        // song by title
        const tmp = await db.Song.destroy({
            where:{
                title: req.body.title
            }
        });
        if(tmp>0){
            res
                .status(200)
                .send({message:`${tmp} songs were deleted`});

        }else{
            res
                .status(404)
                .send({message:`${tmp} songs were deleted, invalid name`});
        }

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    songRouter: songRouter,
}
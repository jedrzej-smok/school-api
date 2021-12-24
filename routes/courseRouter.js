const express = require('express');
const courseRouter = express.Router();
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const db = require("../mainDB/models/index");
const {NotFoundCourseNameError, SameCourseNameError, NotFoundRoomNameError, NotFoundSongNameError, NotFoundLevelNameError, NotFoundDanceGenreNameError, SameRoomNameError} = require("../utils/errors");
const {checkAuth} = require("../utils/auth");

courseRouter
//read
.get('/course',checkAuth('instructor'), async function(req, res, next)  {
    try{
        // Find all courses
        const courses = await db.Course.findAll({
            attributes:['name'],
            order:['courseId']
        });

        const resCourses = courses.map( (course) => course.name);

        res
            .status(200)
            .send(JSON.stringify(resCourses));
    }catch(err){
        console.log(err);
        next(err);
    }
})
.get('/course/one',checkAuth('instructor'), async function(req, res, next)  {
    try{
        const {byName} = req.body;
        const course = await db.Course.findOne({
            where :{
                name: byName
            },
            attributes:['courseId','name','price','numberClasses','startTime','requirements', 'roomId', 'songId', 'levelId', 'danceGenreId'],
            order:['courseId'],
            include:[db.Room, db.Song, db.Level, db.DanceGenre]
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }
        const assignments = await course.getAssignments();
        const instructors = await Promise.all(assignments.map(async(assignment) => {
                const instructor = await db.Instructor.findOne({
                    where:{
                        instructorId: assignment.instructorId
                    },
                    attributes:['email']
                });
                return instructor.email;
            })
        );
        const registrations = await course.getRegistrations();
        const participants = await Promise.all(registrations.map(async(registration) => {
                const participant = await db.Participant.findOne({
                    where:{
                        participantId: registration.participantId
                    },
                    attributes:['email']
                });
                return participant.email;
            })
        ); 
        const recordings = await course.getRecordings();

        

        const resCourse  = {
            name: course.name,
            price: course.price,
            numberClasses: course.numberClasses,
            startTime: course.startTime,
            requirements: course.requirements,
            room: course.Room.name,
            song: course.Song.title,
            level: course.Level.name,
            danceGenre: course.DanceGenre.name,
            instructors: instructors,
            participants: participants,
            recordings: recordings.map(recording => {
                return {
                    'id': recording.danceRecordingId,
                    'name': recording.name
                };
            })
        };
        
        res
            .status(200)
            .send(JSON.stringify(resCourse));

    }catch(err){
        console.log(err);
        next(err);
    }
})
//create
.get('/course/form/add',checkAuth('instructor'), async function(req, res, next){
    res.send('Form add course');
})
.post('/course',checkAuth('instructor'), async function(req, res, next)  {
    try{
        try{
            //course create
            const {name,price,numberClasses,startTime,requirements, roomName, songTitle, levelName,danceGenreName} = req.body;
            
            //room
            const room = await db.Room.findOne({
                where:{
                    name: roomName
                },
                attributes:['roomId']
            });
            if(!room){
                throw new NotFoundRoomNameError();
            }
            //song
            const song = await db.Song.findOne({
                where:{
                    title: songTitle
                },
                attributes:['songId']
            });
            if(!song){
                throw new NotFoundSongNameError();
            }
            //level
            const level = await db.Level.findOne({
                where:{
                    name: levelName
                },
                attributes:['levelId']
            });
            if(!level){
                throw new NotFoundLevelNameError();
            }
            //danceGenre
            const danceGenre = await db.DanceGenre.findOne({
                where:{
                    name: danceGenreName
                },
                attributes:['danceGenreId']
            });
            if(!danceGenre){
                throw new NotFoundDanceGenreNameError();
            }

            const course = await db.Course.create({
                name: name,
                price: price,
                numberClasses: numberClasses,
                startTime: startTime,
                requirements: requirements,
                roomId: room.roomId,
                songId: song.songId,
                levelId: level.levelId,
                danceGenreId: danceGenre.danceGenreId
            });
            console.log("course created:");
            res
                .status(200)
                .send(JSON.stringify(
                    {
                        name: course.name,
                        price: course.price,
                        numberClasses: course.numberClasses,
                        startTime: course.startTime,
                        requirements: course.requirements,
                        room: roomName,
                        song: songTitle,
                        level: levelName,
                        danceGenre: danceGenreName,
                    })
                );
    
        }catch(err){
            console.log('wyswitel blad', err);
            if (err.name ==='SequelizeUniqueConstraintError'){
                throw new SameCourseNameError();
            }else{
                throw err;
            }
        }
    }catch(err){
        next(err);
    }
    
})
//update
.get('/course/form/edit',checkAuth('instructor'), async function(req, res, next){
    try{
        // course by name
        const {byName} = req.body;
        const course = await db.Course.findOne({
            where :{
                name: byName
            },
            attributes:['courseId','name','price','numberClasses','startTime','requirements', 'roomId', 'songId', 'levelId', 'danceGenreId'],
            order:['courseId'],
            include:[db.Room, db.Song, db.Level, db.DanceGenre]
        });
        if(!course){
            throw new NotFoundCourseNameError();
        }

        resCourse = {
            name: course.name,
            price: course.price,
            numberClasses: course.numberClasses,
            startTime: course.startTime,
            requirements: course.requirements,
            room: (await course.getRoom()).name,
            song: (await course.getSong()).title,
            level: (await course.getLevel()).name,
            danceGenre: (await course.getDanceGenre()).name
        };
        console.log("One song to edit:", JSON.stringify(resCourse));
        res
            .status(200)
            .send(JSON.stringify(resCourse));

    }catch(err){
        console.log(err);
        next(err);
    }
    
})
.put('/course',checkAuth('instructor'), async function(req, res, next)  {
    try{
        const {byName,name,price,numberClasses,startTime,requirements, roomName, songTitle, levelName,danceGenreName} = req.body;
            
            //room
            const room = await db.Room.findOne({
                where:{
                    name: roomName
                },
                attributes:['roomId']
            });
            if(!room){
                throw new NotFoundRoomNameError();
            }
            //song
            const song = await db.Song.findOne({
                where:{
                    title: songTitle
                },
                attributes:['songId']
            });
            if(!song){
                throw new NotFoundSongNameError();
            }
            //level
            const level = await db.Level.findOne({
                where:{
                    name: levelName
                },
                attributes:['levelId']
            });
            if(!level){
                throw new NotFoundLevelNameError();
            }
            //danceGenre
            const danceGenre = await db.DanceGenre.findOne({
                where:{
                    name: danceGenreName
                },
                attributes:['danceGenreId']
            });
            if(!danceGenre){
                throw new NotFoundDanceGenreNameError();
            }
        const checkCourse =  await db.Course.findOne({where:{name: name}});
        if(checkCourse && byName !== name){
            throw new SameCourseNameError();
        }
        await db.Course.update({
            name: name,
            price: price,
            numberClasses: numberClasses,
            startTime: startTime,
            requirements: requirements,
            roomId: room.roomId,
            songId: song.songId,
            levelId: level.levelId,
            danceGenreId: danceGenre.danceGenreId,
        },{
            where:{
                name: byName
            }
        });
        res
            .status(200)
            .send('One course modified');

    }catch(err){
        next(err);
    }  
})
//delete
.delete('/course',checkAuth('instructor'), async function(req, res, next)  {
    try{
        // couse by name
        const tmp = await db.Course.destroy({
            where:{
                name: req.body.name
            }
        });
        
        console.log(`${tmp} course were deleted`);
        res
            .status(200)
            .send(`${tmp} course were deleted`);

    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = {
    courseRouter: courseRouter,
}
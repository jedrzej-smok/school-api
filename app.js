require('dotenv').config()
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const express = require('express');
// const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')

//local requires
const db = require("./mainDB/models/index");
const {testDBconnection} = require("./test");
const {handleError} = require("./utils/errors");

const {homeRouter} = require("./routes/home");
const {adminRouter} = require("./routes/admin");
const {instructorAccountRouter} = require("./routes/instructorAccountRouter");
const {participantAccountRouter} = require("./routes/participantAccountRouter");
const {levelRouter} = require("./routes/levelRouter");
const {roomRouter} = require("./routes/roomRouter");
const {performerRouter} = require("./routes/performerRouter");
const {songRouter} = require("./routes/songRouter");
const {danceGenreRouter} = require("./routes/danceGenreRouter");
const {instructorRouter} = require("./routes/instructorRouter");
const {instructorAndGenreRouter} = require("./routes/instructorAndGenre");
const {courseRouter} = require("./routes/courseRouter");
const {assignmentRouter} = require("./routes/assignmentRouter");
const {participantRouter} = require("./routes/participantRouter");
const {registrationRouter} = require('./routes/registrationRouter');
const {recordingRouter} = require('./routes/recordingRouter');

const { userLoginRouter } = require("./routes/userLogin");
const {execProcedureFunctionRouter} = require("./utils/execProcedureFunction");

//db connection, models synchronization
async function createDB(){
    const testDB = await testDBconnection(db);
    const syncDB = await db.sequelize.sync(/*{force:true}*/);
    await Promise.all([testDB,syncDB]);
    console.log("All models were synchronized successfully.");
};

console.log(typeof createDB);

//app conifig___________________________________________________________________________________________________________________
const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());




//routes_________________________________________________________________________________________________________________________
app.use('/',homeRouter);
app.use('/login', userLoginRouter);
app.use('/admin', adminRouter);
app.use('/instructor', instructorAccountRouter);
app.use('/participant', participantAccountRouter);

app.use('/admin',levelRouter);
app.use('/admin',roomRouter);
app.use('/admin',performerRouter);
app.use('/admin',songRouter);
app.use('/admin',danceGenreRouter);
app.use('/admin',instructorRouter);
app.use('/admin',instructorAndGenreRouter);

app.use('/instructor', courseRouter);
app.use('/instructor', assignmentRouter);
app.use('/instructor', participantRouter);
app.use('/instructor', registrationRouter);
app.use('/instructor', recordingRouter);
app.use('/instructor/execute', execProcedureFunctionRouter);



//listen serwer_________________________________________________________________________________________________________________________
app.use(handleError);
//listen
createDB()
    .then(()=>{
        app.listen(3000, 'localhost', () => {
            console.log('Listening danceSchool on http://localhost:3000');
        });
    })
    .catch((e) => console.log(e));
    
//test_DB___________________________________________________________________________________________________________________________
// (async () => {
//     await testDBconnection(db);
//     //czyszczenie bazy
//     // await db.sequelize.sync({ force: true });
//     // po tym w konsoli npx sequelize-cli db:seed:all
//     await db.sequelize.sync();
//     console.log("All models were synchronized successfully.");
    
//     // query
//     // const igor =  await db.Participant.findByPk(2);
//     // const iga =  await db.Participant.findByPk(1);
//     // const balet = await db.Course.findByPk(1);
//     // const lenaNowak =  await db.Instructor.findByPk(3);
//     // const genre3 = await db.DanceGenre.findByPk(3);

//     // const tmp = await db.Registration.create({
//     //     attendance: 0,
//     //     courseId: balet.courseId,
//     //     participantId: igor.participantId
//     // });
//     // const newR = await db.Registration.findByPk(18);
//     //await iga.addRegistration(newR);
//     // await lenaNowak.addDanceGenre(genre3);

   

// })();




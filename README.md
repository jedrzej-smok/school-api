# projektZBD
# start
npm init -y
npm install --save mysql2
npm install --save express
npm i dotenv
create .env
npm install sequelize-cli -g
npm install --save sequelize
cd db
    -npx sequelize-cli init
move db/conifg as ./config/database.json
create .sequelizerc
# create orm models
npx sequelize-cli db:create  - tworzy baza zapisana w database.json

npx sequelize-cli model:generate --name Instructor --attributes instructorId:integer,email:string,password:string,name:string,surname:string,isAdmin:integer

npx sequelize-cli model:generate --name Participant --attributes participantId:integer,email:string,password:string,name:string,surname:string

npx sequelize-cli model:generate --name Performer --attributes performerId:integer,name:string,musicGenre:string

npx sequelize-cli model:generate --name Song --attributes songId:integer,title:string,source:string


npx sequelize-cli model:generate --name Level --attributes levelId:integer,name:string

npx sequelize-cli model:generate --name Room --attributes roomId:integer,capacity:integer

npx sequelize-cli model:generate --name  DanceGenre --attributes DanceGenreId:integer,name:string

npx sequelize-cli model:generate --name  InstructorDanceGenres --attributes id:integer

npx sequelize-cli model:generate --name Course --attributes name:string,price:double,source:string,numberClasses:integer,startTime:date,requirements:string

npx sequelize-cli model:generate --name Recording --attributes danceRecordingId:integer,name:string,source:string

npx sequelize-cli model:generate --name Registration --attributes attendance:integer 

npx sequelize-cli model:generate --name Assignment --attributes earnings:double

# ORM was created
# create seeds
npx sequelize-cli seed:generate --name demo-instructor
npx sequelize-cli db:seed:all

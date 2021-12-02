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
# create orm
npx sequelize-cli db:create  - tworzy baza zapisana w database.json

npx sequelize-cli model:generate --name Instructor --attributes instructorId:integer,email:string,password:string,name:string,surname:string,isAdmin:integer

npx sequelize-cli model:generate --name Participant --attributes participantId:integer,email:string,password:string,name:string,surname:string

npx sequelize-cli model:generate --name Performer --attributes performerId:integer,name:string,musicGenre:string


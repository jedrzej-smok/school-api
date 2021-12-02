async function testDBconnection(db){
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    testDBconnection,
};
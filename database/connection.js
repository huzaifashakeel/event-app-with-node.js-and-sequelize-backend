const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('demo', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports.startDatabase = async function startDatabase() {
    try {
        await sequelize.authenticate()
        console.log("Connection Established Successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports.createTable = async function createTable() {

    try {
        await sequelize.sync({ alter: true }),
            console.log('Tables Created Successfully')
    }
    catch (e) {
        console.log(e)
    }
}

module.exports.sequelize = sequelize


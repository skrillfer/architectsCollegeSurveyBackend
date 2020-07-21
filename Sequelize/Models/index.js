const dbConfig = require("../../conexion/db.config");
console.log(dbConfig.PASSWORD);
const Sequelize = require("sequelize");
//database,username,password
const sequelize = new Sequelize('ERPTECHWEB', 'testERP', 'techweb2020', {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate()
.then(() => {
    console.log('Conectado')
})
.catch(err => {
    console.log(err)
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Survey = require("./Survey.js")(sequelize, Sequelize);

module.exports = db;

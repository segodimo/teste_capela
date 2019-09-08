// var mysql = require('mysql');
const Sequelize = require('sequelize')

const sequelize = new Sequelize('tstcinema','root','password', {
    host: 'Localhost',
    // host: '127.0.0.1',
    // port:"80",
    dialect: 'mysql'
  })

sequelize
  .authenticate()
  .then(() => {
    console.log('OKOKOKOKOK');
  })
  .catch(err => {
    console.log('PAILA '+err);
  });

const Sequelize = require('sequelize')

export const sequelize = new Sequelize(
    'tstcinema',
    'root',
    'password',
    {
        host: 'Localhost',
        // host: '127.0.0.1',
        // port:"80",
        dialect: 'mysql',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('OKOKOKOKOK');
//   })
//   .catch(err => {
//     console.log('PAILA '+err);
//   });

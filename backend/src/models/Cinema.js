const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');


const Cinema = sequelize.define('cinema', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    salas: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

module.exports = Cinema;
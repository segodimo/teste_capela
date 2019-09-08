const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');


const sessoes = sequelize.define('sessoes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_filme: {
        type: Sequelize.INTEGER
    },
    id_cinema: {
        type: Sequelize.INTEGER
    },
    no_sala: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false
});

module.exports = sessoes;
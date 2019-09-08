const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');

const Sessoes = require('./Sessoes');

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

// Cinema.hasMany(Sessoes, { foreinkey: 'id_cinema', sourceKey: 'id' });
// Sessoes.belongsTo(Cinema, { foreinkey: 'id_cinema', targetId: 'id' });

Cinema.hasMany(Sessoes, { foreinkey: 'id_cinema', sourceKey: 'id' });
Sessoes.belongsTo(Cinema, { foreinkey: 'id_cinema', targetId: 'id' });

module.exports = Cinema;
const Sequelize = require('sequelize');
const { sequelize } = require('../database/database');

const Sessoes = require('./Sessoes');

const Filme = sequelize.define('filme', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING
    },
    genero: {
        type: Sequelize.STRING
    },
    duracao: {
        type: Sequelize.INTEGER
    },
    classificacao: {
        type: Sequelize.INTEGER
    },
    lancamento: {
        type: Sequelize.DATE
    },
    sinopse: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = Filme;

// Filme.hasMany(Sessoes, { foreinkey: 'id_filme', sourceKey: 'id' });
// Sessoes.belongsTo(Filme, { foreinkey: 'id_filme', targetId: 'id' });

Filme.hasMany(Sessoes, { foreinkey: 'id_filme', sourceKey: 'id' });
Sessoes.belongsTo(Filme, { foreinkey: 'id_filme', targetId: 'id' });

module.exports = Filme;
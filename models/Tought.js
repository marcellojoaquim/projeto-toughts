const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const User = require('./User');

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

// relação entre as entidades que são representadas pelos models

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought
const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const Profesional = require('./Profesional')

const Slot = sequelize.define('Slot', {
    fecha:  {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    profesionalId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Profesional,
            key: 'id'
        },
        onDelete: 'CASCADE'

    }
    
});

Profesional.hasMany(Slot,{foreignKey: 'profesionalId'})
Slot.belongsTo(Profesional, {foreignKey:'profesionalId'})
module.exports = Slot;
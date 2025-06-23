const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profesional = sequelize.define('Profesional', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.ENUM('Corte de pelo', 'Arreglo de barba', 'Coloración de cabello'),
    allowNull: false,
    defaultValue: 'Corte de pelo'
  }
});

module.exports = Profesional;

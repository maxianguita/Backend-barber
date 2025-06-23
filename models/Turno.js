// models/Turno.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profesional = require('./Profesional');
const Disponibilidad = require('./Disponibilidad'); 
const User = require('./User')

const Turno = sequelize.define('Turno', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,  // Si este campo es opcional
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,  // Cambié esto a true para evitar el error con registros existentes
    defaultValue: 'No disponible',  // Puedes asignar un valor por defecto si lo prefieres
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente', // Valor por defecto para el estado
  },
  disponibilidadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profesionalId: {            // <-- Agregar esta línea prueba
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Turno.belongsTo(Profesional, { foreignKey: 'profesionalId' });
Profesional.hasMany(Turno, { foreignKey: 'profesionalId' });

Turno.belongsTo(Disponibilidad, { foreignKey: 'disponibilidadId' }); 
Disponibilidad.hasMany(Turno, { foreignKey: 'disponibilidadId' });  

Turno.belongsTo(User, { foreignKey: 'usuarioId' });
User.hasMany(Turno, { foreignKey: 'usuarioId' });

module.exports = Turno;

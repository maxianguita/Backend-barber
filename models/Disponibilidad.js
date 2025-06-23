const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disponibilidad = sequelize.define('Disponibilidad', {
  dia: {
    type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'),
    allowNull: false
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  profesionalId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: require('./Profesional'),
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  validate: {
    horaValida() {
      if (this.horaInicio >= this.horaFin) {
        throw new Error('La hora de inicio debe ser antes que la hora de fin');
      }
    }
  }
});

module.exports = Disponibilidad;

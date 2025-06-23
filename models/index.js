const Profesional = require('./Profesional');
const Disponibilidad = require('./Disponibilidad');
const Slot = require('./Slot')

// Definir relaciones
Profesional.hasMany(Disponibilidad, { foreignKey: 'profesionalId', as: 'disponibilidades' });
Disponibilidad.belongsTo(Profesional, { foreignKey: 'profesionalId', as: 'profesional' });


module.exports = {
  Profesional,
  Disponibilidad,
  Slot,

};

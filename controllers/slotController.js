const Profesional = require('../models/Profesional');
const Disponibilidad = require('../models/Disponibilidad');
const Slot = require('../models/Slot');

const { addDays, format } = require('date-fns');

// Este método lo podés ejecutar al crear un profesional nuevo
const generarSlots = async (profesionalId) => {
  const disponibilidad = await Disponibilidad.findAll({ where: { profesionalId } });

  const diasDisponibles = disponibilidad.map(d => ({
    dia: d.dia,
    horaInicio: d.horaInicio,
    horaFin: d.horaFin
  }));

  const diasSemana = {
    'Domingo': 0,
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sábado': 6
  };

  const hoy = new Date();
  const hasta = new Date();
  hasta.setFullYear(hoy.getFullYear() + 3); // 3 años adelante

  const slotsAGuardar = [];

  for (let d = new Date(hoy); d <= hasta; d.setDate(d.getDate() + 1)) {
    const diaTexto = Object.keys(diasSemana).find(key => diasSemana[key] === d.getDay());

    const disponibilidadDia = diasDisponibles.find(dd => dd.dia === diaTexto);
    if (disponibilidadDia) {
      const horaInicio = parseInt(disponibilidadDia.horaInicio.split(':')[0]);
      const horaFin = parseInt(disponibilidadDia.horaFin.split(':')[0]);

      for (let h = horaInicio; h < horaFin; h++) {
        const horaFormateada = `${h.toString().padStart(2, '0')}:00:00`;

        slotsAGuardar.push({
          fecha: format(d, 'yyyy-MM-dd'),
          hora: horaFormateada,
          disponible: true,
          profesionalId
        });
      }
    }
  }

  await Slot.bulkCreate(slotsAGuardar);
};
module.exports = { generarSlots };
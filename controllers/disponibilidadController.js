// controllers/disponibilidadController.js

const Disponibilidad = require('../models/Disponibilidad');

// Obtener disponibilidad de un profesional
const obtenerDisponibilidad = async (req, res) => {
  try {
    const { profesionalId } = req.params;
    const disponibilidades = await Disponibilidad.findAll({ where: { profesionalId } });
    res.json(disponibilidades);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener disponibilidad', error: err });
  }
};

// Crear disponibilidad para un profesional
const crearDisponibilidad = async (req, res) => {
  try {
    const { dia, horaInicio, horaFin, profesionalId } = req.body;

    if (!dia || !horaInicio || !horaFin || !profesionalId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const disponibilidad = await Disponibilidad.create({
      dia,
      horaInicio,
      horaFin,
      profesionalId
    });

    res.status(201).json(disponibilidad);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear disponibilidad', error: err });
  }
};
const obtenerProfesionalesConDisponibilidad = async (req, res) => {
  try {
    const profesionales = await Profesional.findAll({
      include: Disponibilidad
    });
    res.json(profesionales);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener profesionales', error: err });
  }
};



module.exports = {
  obtenerDisponibilidad,
  crearDisponibilidad,
  obtenerProfesionalesConDisponibilidad 
};

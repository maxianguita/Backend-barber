
const Profesional = require('../models/Profesional');
const Disponibilidad = require('../models/Disponibilidad');
const { generarSlots } = require('./slotController'); 


const crearProfesional = async (req, res) => {
  const { nombre, especialidad, disponibilidad } = req.body;

  try {
    const nuevoProfesional = await Profesional.create({ nombre, especialidad });

    if (Array.isArray(disponibilidad) && disponibilidad.length > 0) {
      const disponibilidadConProfesional = disponibilidad.map(d => ({
        ...d,
        profesionalId: nuevoProfesional.id,
      }));

      await Disponibilidad.bulkCreate(disponibilidadConProfesional, { validate: true });

      // 🚀 GENERAR SLOTS automáticamente después de guardar la disponibilidad
      await generarSlots(nuevoProfesional.id);
    }

    const profesionalConDisponibilidad = await Profesional.findByPk(nuevoProfesional.id, {
      include: {
        model: Disponibilidad,
        as: 'disponibilidades', // error corregido
      },
    });

    res.status(201).json(profesionalConDisponibilidad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear profesional', error: err });
  }
};

const eliminarProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Profesional.destroy({ where: { id } });

    if (!eliminado) {
      return res.status(404).json({ message: 'Profesional no encontrado' });
    }

    res.status(200).json({ message: 'Profesional eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar profesional', error: err });
  }
};

const obtenerProfesionales = async (req, res) => {
  try {
    const profesionales = await Profesional.findAll();
    res.json(profesionales);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener profesionales', error: err });
  }
};

// const obtenerProfesionalesConDisponibilidad = async (req, res) => {
//   try {
//     const profesionales = await Profesional.findAll({
//       include: Disponibilidad,
//     });
//     res.json(profesionales);
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener profesionales', error: err });
//   }
// };
const obtenerProfesionalesConDisponibilidad = async (req, res) => {
  try {
    const profesionales = await Profesional.findAll({
      include: {
        model: Disponibilidad,
        as: 'disponibilidades' // ¡Este alias es CLAVE!
      }
    });
    res.json(profesionales);
  } catch (err) {
    console.error(err); // Agregalo para ver errores en consola también
    res.status(500).json({ message: 'Error al obtener profesionales', error: err });
  }
};


module.exports = {
  crearProfesional,
  eliminarProfesional,
  obtenerProfesionales,
  obtenerProfesionalesConDisponibilidad,
};

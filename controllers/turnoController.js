// controllers/turnoController.js

const Turno = require('../models/Turno');
const Disponibilidad = require('../models/Disponibilidad');
const Usuario = require('../models/User')
const Profesional = require('../models/Profesional');

//nuevo turno user
// const obtenerTurnosUsuario = async (req, res) => {
//   try {
//     const userId = req.user.id;  // lo pone verifyToken en req.user

//     const turnos = await Turno.findAll({
//       where: { usuarioId: req.user.id },
//       order: [['fecha', 'ASC'], ['hora', 'ASC']],
//     });

//     res.json(turnos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al obtener turnos' });
//   }
// };
const obtenerTurnosUsuario = async (req, res) => {
  try {
    const userId = req.user.id;

    const turnos = await Turno.findAll({
      where: { usuarioId: userId },
      order: [['fecha', 'ASC'], ['hora', 'ASC']],
      include: [
        {
          model: Profesional,
          attributes: ['nombre', 'especialidad'], // Lo que quieres mostrar
        }
      ]
    });

    res.json(turnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener turnos' });
  }
};

//borrar turno
// const borrarTurno = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const turno = await Turno.findByPk(id);
//     if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

//     await turno.destroy();
//     res.json({ message: 'Turno eliminado correctamente' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al eliminar turno' });
//   }
const borrarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findByPk(id);

    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }

    // Solo admin o el dueño del turno puede borrarlo
    const esAdmin = req.user.rol === 'admin';
    const esDueño = turno.usuarioId === req.user.id;

    if (!esAdmin && !esDueño) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este turno' });
    }

    await turno.destroy();
    res.json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar turno' });
  }
};



// Obtener todos los turnos
const obtenerTurnos = async (req, res) => {
    try {
      const turnos = await Turno.findAll();
      res.json(turnos);
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
      res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};

// Crear un turno validando disponibilidad
const crearTurno = async (req, res) => {
  try {
    console.log('Usuario autenticado:', req.user); 

    const { nombre, telefono, servicio, fecha, hora, profesionalId, disponibilidadId } = req.body;
    const usuarioId = req.user.id; // 👈 esto lo tomás del token

    if (!nombre || !telefono || !servicio || !fecha || !hora || !profesionalId || !disponibilidadId || !usuarioId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const disponibilidad = await Disponibilidad.findOne({ where: { id: disponibilidadId } });
    if (!disponibilidad) {
      return res.status(404).json({ message: 'Disponibilidad no encontrada' });
    }

    const nuevoTurno = await Turno.create({
      nombre,
      telefono,
      servicio,
      fecha,
      hora,
      profesionalId,
      disponibilidadId,
      usuarioId: req.user.id 
    });

    res.status(201).json(nuevoTurno);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear turno', error: err });
  }
};

module.exports = {
  obtenerTurnos,
  crearTurno,
  obtenerTurnosUsuario,
  borrarTurno,
};

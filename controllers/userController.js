const Usuario = require('../models/User');
const Turno = require('../models/Turno');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};


// Crear un nuevo usuario (cliente o admin)
const createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Crear nuevo usuario
    const newUser = await Usuario.create({
      nombre,
      email,
      password,
      telefono,
      rol: rol || 'cliente',
    });

    // Excluir la contraseña al devolver los datos
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    // Crear token JWT (incluyendo el rol para validaciones futuras)
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        // rol: newUser.rol,
        rol: user.rol,
      },
      jwtSecret,
      { expiresIn: '24h' } // el token expira en 24 horas (ajustable)
    );

    res.status(201).json({
      usuario: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

// eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
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

// Crear un nuevo turno
const crearTurno = async (req, res) => {
  try {
    const { nombre, telefono, servicio, fecha, hora, estado, disponibilidadId } = req.body;

    if (!nombre || !telefono || !servicio || !fecha || !hora || !disponibilidadId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const nuevoTurno = await Turno.create({
      nombre,
      telefono,
      servicio,
      fecha,
      hora,
      estado: estado || 'pendiente',
      disponibilidadId, // 💡 ¡Este es clave!
    });

    res.status(201).json(nuevoTurno);
  } catch (error) {
    console.error('Error al crear el turno:', error);
    res.status(500).json({ message: 'Error al crear el turno' });
  }
};


// Obtener la disponibilidad de un profesional
// const obtenerDisponibilidad = async (req, res) => {
//   try {
//     const { profesionalId } = req.params;
//     const disponibilidades = await Disponibilidad.findAll({
//       where: { profesionalId },
//     });
//     res.json(disponibilidades);
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener disponibilidad', error: err });
//   }
// };

// Crear disponibilidad para un profesional
// const crearDisponibilidad = async (req, res) => {
//   try {
//     const { profesionalId, dia, horaInicio, horaFin } = req.body;
//     const nuevaDisponibilidad = await Disponibilidad.create({
//       profesionalId,
//       dia,
//       horaInicio,
//       horaFin
//     });
//     res.status(201).json(nuevaDisponibilidad);
//   } catch (err) {
//     res.status(500).json({ message: 'Error al crear disponibilidad', error: err });
//   }
// };

// Exportar todas las funciones de forma coherente
module.exports = {
  getAllUsers,
  createUser,
  obtenerTurnos,
  crearTurno,
  deleteUser,
  
};

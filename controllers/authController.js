// const User = require('../models/User'); 
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const authController = {
//   register: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       const existingUser = await User.findOne({ where: { email } });
//       if (existingUser) {
//         return res.status(400).json({ message: 'El usuario ya existe' });
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);

//       await User.create({
//         email,
//         password: hashedPassword
//       });

//       res.status(201).json({ message: 'Usuario creado correctamente' });

//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error en el servidor', error });
//     }
//   },

//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
//       }
//     //   console.log('JWT_SECRET:', process.env.JWT_SECRET);
//     //   const token = jwt.sign(
//     //     { id: user.id, email: user.email,name: newUser.nombre, },
//     //     process.env.JWT_SECRET,
//     //     { expiresIn: '1h' }
//     //   );
//     const token = jwt.sign(
//         { id: user.id,
//            email: user.email,
//             name: user.nombre,
//             // nombre: user.nombre,   
//             rol: user.rol           
//           },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
      

//       res.json({
//         token,
//         user: {
//           id: user.id,
//           email: user.email,
//           rol: user.rol, 
//           nombre: user.nombre, 
//         }
//       });
      

//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error en el servidor', error });
//     }
//   }
// };

// module.exports = authController;
// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  // REGISTRO
  register: async (req, res) => {
    try {
      const { nombre, email, password, rol } = req.body;

      if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        nombre,
        email,
        password: hashedPassword,
        rol,
      });

      res.status(201).json({
        message: 'Usuario creado correctamente',
        usuario: newUser,
      });
    } catch (error) {
      console.error('❌ Error en registro:', error);
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log("📥 Login recibido:", email, password);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.log("❌ Usuario no encontrado");
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }

      console.log("👤 Usuario encontrado:", user.email);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔍 Comparación de contraseña:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.nombre,
          rol: user.rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        usuario: {
          id: user.id,
          email: user.email,
          rol: user.rol,
          nombre: user.nombre,
        },
      });

    } catch (error) {
      console.error('❌ Error en login:', error);
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  }
};

module.exports = authController;

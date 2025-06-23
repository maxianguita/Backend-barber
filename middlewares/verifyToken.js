// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config/config');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Token malformado' });

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.user = decoded; // ahora req.user tiene { id, rol, nombre, etc }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token inválido o expirado' });
//   }
// };

// const isAdmin = (req, res, next) => {
//   if (req.user.rol !== 'admin') {
//     return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
//   }
//   next();
// };

// module.exports = { verifyToken, isAdmin };
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log('Authorization header recibido:', authHeader); // <-- línea de debug

  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token malformado' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    // console.log('Token decodificado:', decoded);
    req.user = decoded; // ahora req.user tiene { id, rol, nombre, etc }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };

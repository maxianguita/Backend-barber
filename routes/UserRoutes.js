// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

// Registro
router.post('/', userController.createUser);

// Obtener todos los usuarios
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

// Borrar usuario (solo admin)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

// Panel admin
router.get('/panel-admin', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// Ruta de prueba admin
router.get('/solo-admin', verifyToken, isAdmin, (req, res) => {
  res.send('Sos admin y podés ver esto');
});

module.exports = router;

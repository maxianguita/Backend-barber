const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/mis-turnos', verifyToken, turnoController.obtenerTurnosUsuario);
router.get('/', verifyToken, isAdmin, turnoController.obtenerTurnos);
router.post('/', verifyToken, turnoController.crearTurno);
router.delete('/:id', verifyToken, turnoController.borrarTurno); 

module.exports = router;

// routes/disponibilidadRoutes.js
const express = require('express');
const router = express.Router();
const disponibilidadController = require('../controllers/disponibilidadController');

router.get('/:profesionalId', disponibilidadController.obtenerDisponibilidad);
router.post('/', disponibilidadController.crearDisponibilidad);

module.exports = router;

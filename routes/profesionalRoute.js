const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

// Crear profesional
router.post('/', profesionalController.crearProfesional);

// Obtener todos los profesionales
router.get('/', profesionalController.obtenerProfesionales);

// Eliminar un profesional por ID
router.delete('/:id', profesionalController.eliminarProfesional); // 

// routes/profesionalRoutes.js
router.get('/con-disponibilidad', profesionalController.obtenerProfesionalesConDisponibilidad);

module.exports = router;

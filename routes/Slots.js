// routes/slots.js o dentro de tu router principal
const express = require('express');
const router = express.Router();
const { Slot } = require('../models');
const { Op } = require('sequelize');

router.get('/disponibles/:profesionalId', async (req, res) => {
  try {
    const { profesionalId } = req.params;

    const slots = await Slot.findAll({
      where: {
        profesionalId,
        disponible: true,
        fecha: {
          [Op.gte]: new Date() // Solo fechas futuras
        }
      },
      order: [['fecha', 'ASC'], ['hora', 'ASC']]
    });

    res.json(slots);
  } catch (error) {
    console.error('Error al obtener slots:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

module.exports = router;

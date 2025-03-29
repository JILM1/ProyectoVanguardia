// backend/routes/reservas.js
const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Crear una nueva reserva
router.post('/', async (req, res) => {
  try {
    const { usuario, fecha, hora, cantidad } = req.body;

    // Validar datos
    if (!usuario || !fecha || !hora || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevaReserva = new Reserva({ usuario, fecha, hora, cantidad });
    await nuevaReserva.save();
    res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva });
  } catch (error) {
    console.error(error); // Agregar para depurar el error
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('usuario', 'username email');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});

// Obtener una reserva por ID
router.get('/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('usuario', 'username email');
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la reserva' });
  }
});

// Actualizar una reserva por ID
router.put('/:id', async (req, res) => {
  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservaActualizada) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.status(200).json({ message: 'Reserva actualizada', reserva: reservaActualizada });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
});

// Eliminar una reserva por ID
router.delete('/:id', async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.status(200).json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
});

module.exports = router;

// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const nuevoUsuario = new User({ username, email, password });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el registro del usuario' });
  }
});

// Autenticación de usuario (login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email, password });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    res.status(200).json({ message: 'Autenticación exitosa', usuarioId: usuario._id });
  } catch (error) {
    res.status(500).json({ error: 'Error durante la autenticación' });
  }
});

module.exports = router;

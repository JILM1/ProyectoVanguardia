// backend/models/Reserva.js
const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  usuario:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fecha:     { type: Date, required: true },
  hora:      { type: String, required: true },
  cantidad:  { type: Number, required: true }
});

module.exports = mongoose.model('Reserva', ReservaSchema);

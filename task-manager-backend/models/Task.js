const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  deadline: Date,
  status: {
    type: String,
    enum: ['en cours', 'terminée'], // Valeurs autorisées
    default: 'en cours',
  },
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

module.exports = mongoose.model('Task', taskSchema);

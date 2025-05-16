const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Créer une tâche
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, deadline } = req.body;

  try {
    const newTask = new Task({
      userId: req.user.userId,
      title,
      description,
      deadline,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Obtenir les tâches avec filtres, recherche et tri
router.get('/', authMiddleware, async (req, res) => {
  const { status, search, sortBy } = req.query;
  const filter = { userId: req.user.userId };

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  let sortOption = {};
  if (sortBy === 'deadline') {
    sortOption.deadline = 1; // Tri croissant par date limite
  } else if (sortBy === 'createdAt') {
    sortOption.createdAt = -1; // Tri décroissant par date de création
  }

  try {
    const tasks = await Task.find(filter).sort(sortOption);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Mettre à jour une tâche
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Supprimer une tâche
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: 'Tâche supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, search, sort, order } = req.query;

    // Construction du filtre
    let filter = { userId };

    if (status) {
      filter.status = status; // ex: "terminée" ou "en cours"
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },       // recherche insensible à la casse
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Construction du tri
    let sortOption = {};
    if (sort) {
      const sortOrder = order === 'desc' ? -1 : 1; // ordre ascendant par défaut
      sortOption[sort] = sortOrder;
    }

    const tasks = await Task.find(filter).sort(sortOption);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

import React, { useState } from 'react';
import API from '../services/api';
import "../styles/TaskForm.css"
const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'en attente'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      setForm({ title: '', description: '', deadline: '', status: 'en attente' });
      onTaskAdded();
    } catch (err) {
      alert('Erreur lors de la création');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nouvelle tâche</h3>
      <input
        type="text"
        placeholder="Titre"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        value={form.deadline}
        onChange={e => setForm({ ...form, deadline: e.target.value })}
      />
      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="en attente">En attente</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TaskForm;

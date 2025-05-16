import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filtre, setFiltre] = useState('toutes');
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      alert('Erreur chargement des tâches');
    }
  };

  const toggleCompleted = async (id, currentStatus) => {
    const newStatus = currentStatus === 'terminée' ? 'en cours' : 'terminée';
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert('Erreur modification statut');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter(task => {
      if (filtre !== 'toutes' && task.status !== filtre) return false;
      const search = searchText.toLowerCase();
      return (
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField]?.toString().toLowerCase();
      const valueB = b[sortField]?.toString().toLowerCase();
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

  return (
    <div>
      <h3>Mes tâches</h3>

      <div className="filters">
        <select value={filtre} onChange={e => setFiltre(e.target.value)}>
          <option value="toutes">Toutes</option>
          <option value="en attente">En attente</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <select value={sortField} onChange={e => setSortField(e.target.value)}>
          <option value="">Trier par</option>
          <option value="deadline">Date limite</option>
          <option value="title">Titre</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong> – {task.status} – {task.deadline?.slice(0, 10)}
            <button onClick={() => toggleCompleted(task._id, task.status)}>
              {task.status === 'terminée' ? 'Annuler' : 'Marquer terminée'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

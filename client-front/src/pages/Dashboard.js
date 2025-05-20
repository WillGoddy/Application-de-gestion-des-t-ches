import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [refresh, setRefresh] = React.useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Tableau de bord</h2>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList key={refresh} />
      </div>
    </>
  );
};

export default Dashboard;

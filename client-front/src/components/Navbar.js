import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // pour appliquer un style propre

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h3 className="navbar-logo">Task Manager</h3>
      <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
};

export default Navbar;

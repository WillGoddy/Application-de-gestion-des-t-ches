import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/Login.css"


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Erreur lors de la connexion');
    }
  };

 return (
  <div className="login-container">
    <h2>Connexion</h2>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
      <button type="submit">Se connecter</button>
    </form>
    <p>Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>
  </div>
);

};

export default Login;

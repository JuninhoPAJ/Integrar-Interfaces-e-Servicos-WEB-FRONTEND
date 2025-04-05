import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/home/register.jsx';
import Login from './pages/home/login.jsx'; 
import Home from './pages/home/home.jsx'
import Gerente from './pages/home/gerente.jsx';
import CreateCart from './pages/home/createCar.jsx';

import '../src/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createCar" element={<CreateCart />} />
        <Route path="/gerente" element={<Gerente />} />
      </Routes>
    </Router>
  </StrictMode>
);
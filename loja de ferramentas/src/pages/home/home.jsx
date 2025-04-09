import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  async function getCars() {
    const token = localStorage.getItem('token');
    const responseCars = await api.get('/cars', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCars(responseCars.data);
  }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="home-wrapper">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="https://legado.autoforce.com.br/assets/images/icons/new-car.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-brand">
          <h2>Loja de Carros</h2>
        </div>
        <div className="navbar-buttons">
          <button onClick={() => navigate('/login')} className="nav-button logout-button">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        <h1>Carros Disponíveis</h1>
        <div className="car-list">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car._id} className="car-item">
                <h2>{car.name}</h2>
                {car.image ? (
                  <img src={car.image} alt={car.name} className="car-image" />
                ) : (
                  <p>Imagem não disponível</p>
                )}

                {car.doc ? (
                  <ul className="accessory-list">
                    <li key={car.doc._id}>Data de Expiração: {car.doc.expirationDate}</li>
                  </ul>
                ) : (
                  <p className="no-accessories">Nenhum documento encontrado cadastrado.</p>
                )}
                
                {car.accessory && car.accessory.length > 0 ? (
                  <ul className="accessory-list">
                    {car.accessory.map((acc) => (
                      <li key={acc._id}>{acc.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-accessories">Nenhum acessório cadastrado.</p>
                )}
              </div>
            ))
          ) : (
            <p>Carros não encontrados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

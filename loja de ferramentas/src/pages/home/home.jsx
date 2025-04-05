import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Home.css'; // Importando o arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  async function getCars() {
    const responseCars = await api.get('/cars');
    setCars(responseCars.data);
  }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="home-container">
      <h1>Carros Disponíveis</h1>
      <div className="car-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="car-item">
              <h2>{car.name}</h2>
              {/* Verificando se a URL da imagem está presente e exibindo */}
              {car.image ? (
                <img src={car.image} alt={car.name} className="car-image" />
              ) : (
                <p>Imagem não disponível</p>
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
      <button type='submit' onClick={() => navigate('/createCar')}>Cadastrar Carro</button>
      <button type='submit' onClick={() => navigate('/login')}>Logout</button>
    </div>
  );
};

export default Home;

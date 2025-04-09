import { useState, useEffect } from 'react';
import api from '../../services/api';
import './createCar.css'; // Importando o arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';
import Trash from '../../assets/trash.svg'; // Importando o ícone de lixeira

function CarForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [docId, setDocId] = useState('');  // ID do documento (opcional)
    const [accessoryIds, setAccessoryIds] = useState([]); // IDs dos acessórios
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);  // Estado para armazenar o carro que está sendo editado


    // Função para buscar os carros
    async function getCars() {
        try {
            const token = localStorage.getItem('token');
            const responseCars = await api.get('/cars', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCars(responseCars.data);
        } catch (error) {
            console.error('Erro ao buscar carros:', error);
        }
    }
    useEffect(() => {
        getCars();
    }, []); // Executa apenas uma vez quando o componente for montado

    // Função para adicionar um novo carro
    async function createCar() {
        try {
            const response = await api.post('/cars', {
                name,
                docId: docId || null,  // Se não informado, envia null
                accessoryId: accessoryIds.length > 0 ? accessoryIds : [],  // Garante que accessoryId seja um array
                image
            });

            // Após a criação, atualiza a lista de carros
            setCars(prevCars => [...prevCars, response.data.car]);
        } catch (error) {
            console.error('Erro ao criar carro:', error);
            alert('Ocorreu um erro ao adicionar o carro!');
        }
    }

    // Função para editar um carro
    async function editCar() {
        if (!editingCar) return;

        try {
            const response = await api.put(`/cars/${editingCar._id}`, {
                name,
                docId: docId || null,  // Se não informado, envia null
                accessoryId: accessoryIds.length > 0 ? accessoryIds : [],
                image
            });

            console.log('Carro atualizado:', response.data);

            // Atualiza o carro na lista de carros sem precisar recarregar a página
            const updatedCar = response.data.car;
            setCars(cars.map(car => (car._id === updatedCar._id ? updatedCar : car)));

            // Atualiza os acessórios para que apareçam imediatamente
            updatedCar.accessory = updatedCar.accessory || [];

            setEditingCar(null);  // Limpar o estado de edição
            // Limpar os campos após a atualização
            setName('');
            setImage('');
            setAccessoryIds([]);
            setDocId('');  // Limpar o campo docId após edição
            getCars();  // Recarregar a lista de carros
        } catch (error) {
            console.error('Erro ao editar carro:', error);
            alert('Ocorreu um erro ao editar o carro!');
        }
    }

    // Função para deletar um carro
    async function deleteCar(carId) {
        try {
            await api.delete(`/cars/${carId}`);
            setCars(cars.filter(car => car._id !== carId));
        } catch (error) {
            console.error('Erro ao deletar carro:', error);
        }
    }

    // Função para carregar os dados do carro a ser editado
    function handleEditCar(car) {
        setName(car.name);
        setImage(car.image || '');  // Definir imagem corretamente (caso esteja vazia)
        setAccessoryIds(car.accessory ? car.accessory.map(acc => acc._id) : []); // Preencher acessórios corretamente
        setDocId(car.docId || '');  // Caso haja um docId, ele será carregado
        setEditingCar(car);  // Define o carro que está sendo editado
    }

    return (
        <div className="car-form-container">
            <h2>{editingCar ? 'Editar Carro' : 'Adicionar Carro'}</h2>

            <input
                type="text"
                placeholder="Nome do carro"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="URL da imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)} // Garantir que o campo de imagem seja alterado corretamente
            />

            <input
                type="text"
                placeholder="ID do documento (opcional)"
                value={docId}
                onChange={(e) => setDocId(e.target.value)} // Permite editar o docId
            />

            <input
                type="text"
                placeholder="IDs dos acessórios (separados por vírgula)"
                value={accessoryIds.join(', ')}  // Formatar os IDs de acessórios
                onChange={(e) => setAccessoryIds(e.target.value.split(',').map(id => id.trim()))}
            />

            <button onClick={editingCar ? editCar : createCar}>
                {editingCar ? 'Salvar Alterações' : 'Adicionar Carro'}
            </button>

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
                                        {car.accessory.map((acc, index) => (
                                            <li key={acc._id || index}>{acc.name}</li> // Usando index como fallback se _id não for presente
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="no-accessories">Nenhum acessório cadastrado.</p>
                                )}

                                <button className="edit-button" onClick={() => handleEditCar(car)}>
                                    Editar
                                </button>
                                <button className="delete-button" onClick={() => deleteCar(car._id)}>
                                    <img src={Trash} alt="Deletar" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Carros não encontrados.</p>
                    )}
                </div>
                <button type='submit' onClick={() => navigate('/gerente')}>voltar</button>
            </div>
        </div>
    );
}

export default CarForm;

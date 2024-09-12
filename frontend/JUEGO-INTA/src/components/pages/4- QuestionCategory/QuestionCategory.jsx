import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../../context/CategoryContext.jsx';
import { useUser } from '../../../context/UserContext.jsx';
import UserAvatar from '../../common/avatar.jsx';
import './QuestionCategory.css';

const QuestionCategory = () => {
  const [countdown, setCountdown] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { disableCategory, isCategoryDisabled } = useCategory();
  const {user} = useUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categorias/');
        console.log('Datos recibidos:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    // Si la categoría está deshabilitada, no hacer nada
    if (isCategoryDisabled(category.id)) return;

    setSelectedCategory(category.id);
    disableCategory(category.id);
    setCountdown(3);
    navigate(`/game/${category.id}`);
  };

  return (
    <div className="container">
      <h1 className="main-title">¿Qué categoría vas a elegir?</h1>
      {user && <UserAvatar />} {/* Muestra el avatar del usuario */}
      <h2 className="subtitle">
        {countdown !== null ? `¡Perfecto! El juego arranca en ${countdown}...` : 'Elige una categoría:'}
      </h2>
      <div className="buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            className="c-button c-button--gooey"
            onClick={() => handleCategoryClick(category)}
            disabled={isCategoryDisabled(category.id)} // Deshabilitar botón si corresponde
          >
            {category.nombre}
            <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCategory;

/*//import './PuntajeFinal.css'; // Asegúrate de tener los estilos aplicados en este archivo
import { useNavigate } from 'react-router-dom';

const PuntajeFinal = ({ totalPreguntas, correctas }) => {
  const navigate = useNavigate();

  const handleSalir = () => {
    navigate('/login'); // Redirige a LogIn.jsx
  };

  const handleReiniciar = () => {
    navigate('/question-category'); // Redirige a QuestionCategory.jsx
  };

  return (
    <div className="final-container">
      <img src="logo1.png" alt="Logo" className="logo" />
      <div className="final">
        <h2 className="form_subtitle">Guardianes del suelo</h2>
        <h3 className="form_subtitle subtitulo2">
          ¡Contestaste {correctas}/{totalPreguntas} de preguntas bien!
        </h3>
        <button onClick={handleSalir}>
          <span className="button_top">SALIR DEL JUEGO</span>
        </button>
        <button onClick={handleReiniciar}>
          <span className="button_top">VOLVER A JUGAR</span>
        </button>
      </div>
    </div>
  );
};

export default PuntajeFinal;*/

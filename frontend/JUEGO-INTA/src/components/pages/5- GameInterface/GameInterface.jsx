import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext'; // Importa el UserContext
import './GameInterface.css';

const GameInterface = () => {
  const { categoryId } = useParams();
  const { userId, score, updateScore, userName } = useUser(); // Accede al puntaje y función del contexto
  console.log('userId:', userId);
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18);
  const [timeUp, setTimeUp] = useState(false);
  const navigate = useNavigate();

  // Función para mezclar respuestas aleatoriamente
  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  // Función para obtener las preguntas de la categoría
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/preguntas/categoria/${categoryId}/`);
        const randomQuestions = response.data.map((question) => {
          const answers = shuffleAnswers([
            question.respuesta_correcta,
            question.respuesta_incorrecta_1,
            question.respuesta_incorrecta_2,
            question.respuesta_incorrecta_3,
          ]);
          const correctAnswerIndex = answers.indexOf(question.respuesta_correcta);

          return {
            ...question,
            answers,
            correctAnswerIndex,
          };
        });
        setQuestions(randomQuestions);
      } catch (error) {
        console.error('Error al cargar preguntas', error);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  const currentQuestion = questions[currentQuestionIndex] || {};

  // Manejamos la cuenta regresiva
  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTimeUp(true);
      setOverlayActive(true);

      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setOverlayActive(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeLeft(18);
        setTimeUp(false);
      }, 4000);
    }
  }, [timeLeft, selectedAnswer, userId, score]);

  // Manejamos la selección de respuesta
  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    setOverlayActive(true);

    if (correct) {
      updateScore(1); // Llama a la función updateScore del contexto para acumular el puntaje
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setOverlayActive(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(18);
      setTimeUp(false);
    }, 3000);
  };

  // Comprobamos si hemos llegado al final de las preguntas
  const submitScore = async () => {
    console.log('Current Question Index:', currentQuestionIndex);
    console.log('Questions:', questions);
    console.log('User ID:', userId);
    console.log('Score:', score);
    if (!userId) {
      console.error('User ID is undefined');
      return; // Salir si userId no está definido
    }
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/usuarios/${userId}/update_score/`, {
        score: score, // Enviar el puntaje acumulado al backend
      });

      if (response.status === 200) {
        console.log('Puntaje enviado correctamente', response.data);
      } else {
        console.error('Error al enviar el puntaje');
      }
    } catch (error) {
      console.error('Error al enviar el puntaje:', error);
    }
  }; 

  // Efecto para enviar el puntaje al final
  useEffect(() => {
    if (currentQuestionIndex >= questions.length && questions.length > 0) {
      submitScore();  // Enviar el puntaje
      setTimeout(() => {
        navigate('/categories'); // Redirigir a la pantalla de categorías
      }, 2000);
    }
  }, [currentQuestionIndex, questions.length, navigate, score, userName, userId]);

  // Si no hay preguntas disponibles para la categoría, mostramos un mensaje
  if (!questions.length) {
    return <div>No hay preguntas disponibles para esta categoría</div>;
  }

  return (
    <div className={`interface-container ${overlayActive ? 'overlay-active' : ''}`}>
      <header className="header">
        <h1>Guardianes del suelo</h1>
      </header>
  <div className="image-container">
    {currentQuestion.image ? (
      <>
        {console.log('URL de la imagen:', currentQuestion.image)}
        <img src={currentQuestion.image} alt="Pregunta" />
      </>
    ) : (
      <p>No hay imagen disponible</p>
    )}
  </div>
      <main className="game-container">
        <section className="question-container">
          <div className="question-text">
            {isCorrect === null
              ? currentQuestion.texto_pregunta
              : isCorrect
              ? '¡CORRECTO! ¡A seguir así!'
              : 'INCORRECTA ¡Suerte la próxima!'}
          </div>

          <div className="timer-text">
            {timeUp ? '¡TIEMPO TERMINADO! Pasemos a la siguiente' : `Tiempo: ${timeLeft}s`}
          </div>
        </section>

        <section className="answers-container">
          {currentQuestion.answers?.map((answer, index) => (
            <button
              key={index}
              className={`answer-btn ${selectedAnswer === index && isCorrect !== null
                ? isCorrect ? 'correct-answer' : 'incorrect-answer'
                : ''
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={timeUp}
            >
              {answer}
            </button>
          ))}
        </section>
      </main>

      <footer>
        <p>Puntaje: {score}</p>
      </footer>
    </div>
  );
};

export default GameInterface;

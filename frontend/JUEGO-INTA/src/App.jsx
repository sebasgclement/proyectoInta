import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserAvatar from './components/common/avatar.jsx';
import BlackScreen from './components/common/Transition/BlackScreenTransition';
import Welcome from './components/pages/1- Welcome/Welcome';
import Collaboration from './components/pages/2- Collaboration/Collaboration';
import LogIn from './components/pages/3- PlayerForm/LogIn'; // Nuevo componente de LogIn
import PlayerForm from './components/pages/3- PlayerForm/PlayerForm';
import QuestionCategory from './components/pages/4- QuestionCategory/QuestionCategory';
import GameInterface from './components/pages/5- GameInterface/GameInterface';
import { CategoryProvider } from './context/CategoryContext.jsx'; // Asegúrate de ajustar la ruta de importación
import { UserProvider } from './context/UserContext.jsx'; // Importar UserProvider

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentScreen < 2) {
      const timer = setTimeout(() => {
        handleNextScreen();
      }, 3500); // Cambia de pantalla cada 3.5 segundos

      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleNextScreen = () => {
    setIsTransitioning(true); // Inicia la transición
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false); // Termina la transición
    setCurrentScreen((prevScreen) => prevScreen + 1); // Cambia la pantalla
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <Welcome />;
      case 1:
        return <Collaboration />;
      case 2:
        return <LogIn />; // Aquí se muestra LogIn después de Collaboration
      default:
        return <div>Final</div>;
    }
  };

  return (
    <Router>
      <div className="App">
        <UserProvider> {/* Añadir UserProvider aquí */}
          <CategoryProvider>
          <UserAvatar /> {/* Añadir UserAvatar aquí */}
            <Routes>
              <Route path="/" element={renderScreen()} />
              <Route path="/categories" element={<QuestionCategory />} />
              <Route path="/register" element={<PlayerForm />} />
              <Route path="/game/:categoryId" element={<GameInterface />} />
            </Routes>
          </CategoryProvider>
        </UserProvider>
        <BlackScreen isVisible={isTransitioning} onTransitionEnd={handleTransitionEnd} />
      </div>
    </Router>
  );
};

export default App;

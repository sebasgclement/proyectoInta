// UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState(null); // Asegúrate de que sea null inicialmente

  const login = (name, id) => {
    setUserName(name);
    setUserId(id); // Guarda el ID del usuario
    setScore(0); // Reinicia el puntaje al iniciar sesión
  };

  const logout = () => {
    setUserName(''); // Limpia el nombre de usuario
    setScore(0); // Resetea el puntaje
    setUserId(null); // Limpia el ID del usuario
  };

  const updateScore = (newScore) => {
    setScore((prevScore) => prevScore + newScore); // Acumula el puntaje
  };

  return (
    <UserContext.Provider value={{ userName, score, login, logout, updateScore, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

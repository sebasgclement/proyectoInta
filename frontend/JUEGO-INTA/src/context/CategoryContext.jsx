import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [disabledCategories, setDisabledCategories] = useState([]);

  const disableCategory = (id) => {
    setDisabledCategories((prev) => [...prev, id]);
  };

  const isCategoryDisabled = (id) => disabledCategories.includes(id);

  return (
    <CategoryContext.Provider value={{ disableCategory, isCategoryDisabled }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

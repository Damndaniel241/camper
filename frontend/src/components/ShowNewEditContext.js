// ShowNewEditContext.js
import React, { createContext, useState, useContext } from 'react';

const ShowNewEditContext = createContext();

export const ShowNewEditProvider = ({ children }) => {
  const [showNewEdit, setShowNewEdit] = useState(false);
  return (
    <ShowNewEditContext.Provider value={{ showNewEdit, setShowNewEdit }}>
      {children}
    </ShowNewEditContext.Provider>
  );
};

export const useShowNewEdit = () => {
  return useContext(ShowNewEditContext);
};

// HigherLevelComponent.jsx
import React, { useState } from 'react';
import Main from '../pages/Main'; // Component from current repository
import RepositoryDetails from '../pages/RepositoryDetails'; // Component from other repository
import { ShowNewEditProvider } from './ShowNewEditContext';

const HigherLevelComponent = () => {
  const [showNewEdit, setShowNewEdit] = useState(false);

  return (
    <ShowNewEditProvider>
      <Main showNewEdit={showNewEdit} setShowNewEdit={setShowNewEdit} />
      <RepositoryDetails showNewEdit={showNewEdit} setShowNewEdit={setShowNewEdit} />
      </ShowNewEditProvider>
  );
};

export default HigherLevelComponent;

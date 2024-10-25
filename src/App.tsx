import React from 'react';
import RootNavigator from './Routes';
import {PokemonProvider} from './context/PokemonContext';

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <RootNavigator />
    </PokemonProvider>
  );
};

export default App;

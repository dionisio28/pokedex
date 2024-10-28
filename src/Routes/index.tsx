import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PokemonDetails from '../components/pokemon-details/PokemonDetails';
import PokemonList from '../components/pokemon-list/PokemonList';

export const POKEMON_DETAILS = 'PokemonDetails';
export const POKEMON_LIST = 'PokemonList';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={POKEMON_LIST} component={PokemonList} />
        <Stack.Screen name={POKEMON_DETAILS} component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;

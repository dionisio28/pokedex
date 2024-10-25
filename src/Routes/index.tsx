import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenNames} from '../utils/constants';
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails';
import PokemonList from '../Components/PokemonList/PokemonList';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={screenNames.POKEMON_LIST} component={PokemonList} />
        <Stack.Screen
          name={screenNames.POKEMON_DETAILS}
          component={PokemonDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;

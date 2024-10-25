import React from 'react';
import {usePokemon} from '../../context/PokemonContext';
import {Container} from './styled';
import {ActivityIndicator, FlatList} from 'react-native';
import Text from '../Shared/Text';

const PokemonList: React.FC = () => {
  const {pokemons, loading, error, loadMore} = usePokemon();

  return (
    <Container>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>{error}</Text>}
      <FlatList
        data={pokemons}
        keyExtractor={item => item.name}
        renderItem={({item}) => <Text>{item.name}</Text>}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

export default PokemonList;

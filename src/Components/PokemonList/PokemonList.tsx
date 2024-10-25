import React from 'react';
import {usePokemon} from '../../context/PokemonContext';
import {Container, styles} from './styled';
import {FlatList} from 'react-native';
import Text from '../Shared/Text';
import PokemonCard from './components/PokemonCard';

const PokemonList: React.FC = () => {
  const {pokemons, loading, error, loadMore, handleRefresh} = usePokemon();

  return (
    <Container>
      {error && <Text>{error}</Text>}
      <FlatList
        data={pokemons}
        keyExtractor={item => item.name}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        onEndReached={loadMore}
        onRefresh={() => {
          if (!loading) {
            handleRefresh();
          }
        }}
        refreshing={loading}
        onEndReachedThreshold={0.2}
        style={styles.flatlist}
      />
    </Container>
  );
};

export default PokemonList;

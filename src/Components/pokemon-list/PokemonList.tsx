import React, {useState} from 'react';
import {usePokemon} from '../../context/PokemonContext';
import {Container, styles} from './styled';
import {FlatList} from 'react-native';
import Text from '../shared/Text';
import PokemonCard from './components/PokemonCard';
import SearchInput from './components/SearchInput';

const PokemonList: React.FC = () => {
  const {pokemons, loading, error, loadMore, handleRefresh, handleSearch} =
    usePokemon();

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (text: string) => {
    setSearchTerm(text);
    handleSearch(text);
  };

  return (
    <Container>
      <SearchInput searchTerm={searchTerm} onSearch={handleChange} />
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

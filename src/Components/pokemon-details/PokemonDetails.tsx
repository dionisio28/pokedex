import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {usePokemon} from '../../context/PokemonContext';
import {IPokemonDetails} from 'src/context/PokemonContext';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  Container,
  PokeballImage,
  PokemonImage,
  PokemonImageContainer,
} from './styles';
import {pokemonColorByTypes} from '../../styles';
import PokemonHeader from './components/Header';
import PokemonDetailsList from './components/PokemonDetailsList';
import {Pokeball} from '../../assets';

type PokemonDetailsRouteProp = RouteProp<
  {PokemonDetails: {name: string}},
  'PokemonDetails'
>;

const PokemonDetailsScreen = () => {
  const {params} = useRoute<PokemonDetailsRouteProp>();
  const {name} = params;

  const {getPokemonDetails, loading} = usePokemon();
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails | null>(
    null,
  );

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getPokemonDetails(name);
      setPokemonDetails(details);
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const backgroundColor = useMemo(() => {
    const typeName = pokemonDetails?.types[0].name.toLowerCase();
    return (
      pokemonColorByTypes[typeName as keyof typeof pokemonColorByTypes] ||
      '#FFFFFF'
    );
  }, [pokemonDetails]);

  if (loading || !pokemonDetails) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Container backgroundColor={backgroundColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PokemonHeader
          name={pokemonDetails.name}
          id={Number(pokemonDetails.id)}
          types={pokemonDetails.types}
        />
        <PokemonImageContainer>
          <PokeballImage source={Pokeball} style={{tintColor: '#FFF'}} />
          <PokemonImage source={{uri: pokemonDetails.imageUrl}} />
        </PokemonImageContainer>
        <ScrollView>
          <PokemonDetailsList details={pokemonDetails} />
        </ScrollView>
      </ScrollView>
    </Container>
  );
};

export default PokemonDetailsScreen;

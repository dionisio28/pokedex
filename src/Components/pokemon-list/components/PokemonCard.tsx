import React, {useMemo} from 'react';
import {
  Card,
  DetailsSpace,
  PokeballImage,
  PokemonImage,
  PokemonTypes,
  styles,
} from '../styled';
import Text, {FONT_WEIGHT, SIZE} from '../../shared/Text';
import {IPokemon} from '../../../context/PokemonContext';
import {color, pokemonColorByTypes} from '../../../styles';
import {Pokeball} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  PokemonDetails: {name: string};
};

type PokemonDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonDetails'
>;

interface PokemonCardProps {
  pokemon: IPokemon;
}

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const PokemonCard = ({pokemon}: PokemonCardProps) => {
  const {navigate} = useNavigation<PokemonDetailsNavigationProp>();

  const backgroundColor = useMemo(() => {
    const typeName = pokemon.types[0].type.name.toLowerCase();
    return (
      pokemonColorByTypes[typeName as keyof typeof pokemonColorByTypes] ||
      '#FFFFFF'
    );
  }, [pokemon.types]);

  const onPokemonCardPress = () => {
    navigate('PokemonDetails', {name: pokemon.name});
  };

  return (
    <Card
      onPress={onPokemonCardPress}
      activeOpacity={0.6}
      backgroundColor={backgroundColor}>
      <DetailsSpace>
        <Text
          size={SIZE.XXLARGE}
          color={color.white}
          fontWeight={FONT_WEIGHT.SEMIBOLD}>
          {capitalizeFirstLetter(pokemon.name)}
        </Text>
        {pokemon.types.map(({type}) => (
          <PokemonTypes>
            <Text
              size={SIZE.MEDIUM}
              fontWeight={FONT_WEIGHT.MEDIUM}
              color={color.white}>
              {type.name}
            </Text>
          </PokemonTypes>
        ))}
      </DetailsSpace>

      <PokemonImage source={{uri: pokemon.imageUrl}} />
      <PokeballImage style={styles.pokeball} source={Pokeball} />
    </Card>
  );
};

export default PokemonCard;

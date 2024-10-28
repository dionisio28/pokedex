import React from 'react';
import {Header} from '../styles';
import BacKButton from './BackButton';
import Text, {FONT_WEIGHT, SIZE} from '../../shared/Text';
import {color} from '../../../styles';
import {
  capitalizeFirstLetter,
  formatPokemonId,
} from '../../../utils/pokemonUtils';

interface PokemonHeaderProps {
  name: string;
  id: number;
}

const PokemonHeader = ({name, id}: PokemonHeaderProps) => {
  return (
    <Header>
      <BacKButton />
      <Text
        size={SIZE.XXLARGE}
        fontWeight={FONT_WEIGHT.SEMIBOLD}
        color={color.white}>
        {capitalizeFirstLetter(name)}
      </Text>
      <Text
        color={color.white}
        size={SIZE.MEDIUM}
        fontWeight={FONT_WEIGHT.BOLD}>
        #{formatPokemonId(id)}
      </Text>
    </Header>
  );
};

export default PokemonHeader;

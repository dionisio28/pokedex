import React from 'react';
import {Header} from '../styles';
import BacKButton from './BackButton';
import Text, {FONT_WEIGHT, SIZE} from '../../shared/Text';
import {color} from '../../../styles';

interface PokemonHeaderProps {
  name: string;
  id: number;
}

function formatPokemonId(id: number): string {
  if (id < 10) {
    return id.toString().padStart(3, '0');
  } else if (id < 100) {
    return id.toString().padStart(3, '0');
  } else {
    return id.toString();
  }
}

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

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

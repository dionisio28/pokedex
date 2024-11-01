import React from 'react';
import {Header, PokemonTypes, RowTypes} from '../styles';
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
  types: {name: string}[];
}

const PokemonHeader = ({name, id, types}: PokemonHeaderProps) => {
  return (
    <>
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

      <RowTypes>
        {types.map(item => (
          <PokemonTypes>
            <Text
              size={SIZE.MEDIUM}
              fontWeight={FONT_WEIGHT.MEDIUM}
              color={color.white}>
              {capitalizeFirstLetter(item.name)}
            </Text>
          </PokemonTypes>
        ))}
      </RowTypes>
    </>
  );
};

export default PokemonHeader;

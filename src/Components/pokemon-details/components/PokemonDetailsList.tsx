import React from 'react';
import {
  CardInfo,
  ContainerDetails,
  ListItem,
  RowInfo,
  SectionTitle,
} from '../styles';
import {IPokemonDetails} from '../../../context/PokemonContext';
import Slide from './Slide';
import Text, {FONT_WEIGHT, SIZE} from '../../shared/Text';
import {color} from '../../../styles';
import {capitalizeFirstLetter} from '../../../utils/pokemonUtils';
import {
  decimeterToMeter,
  hectogramsToKilograms,
} from '../../../utils/convertValues';

interface PokemonDetailsListProps {
  details: IPokemonDetails;
}

const PokemonDetailsList: React.FC<PokemonDetailsListProps> = ({details}) => {
  return (
    <ContainerDetails>
      <RowInfo>
        <CardInfo>
          <Text
            fontWeight={FONT_WEIGHT.SEMIBOLD}
            size={SIZE.MEDIUM}
            color={color.white}>
            Height
          </Text>
          <Text
            fontWeight={FONT_WEIGHT.BOLD}
            size={SIZE.LARGE}
            color={color.white}>
            {decimeterToMeter(details.height)} m
          </Text>
        </CardInfo>
        <CardInfo>
          <Text
            fontWeight={FONT_WEIGHT.SEMIBOLD}
            size={SIZE.MEDIUM}
            color={color.white}>
            Weight
          </Text>
          <Text
            fontWeight={FONT_WEIGHT.BOLD}
            size={SIZE.LARGE}
            color={color.white}>
            {hectogramsToKilograms(details.weight)} kg
          </Text>
        </CardInfo>
      </RowInfo>

      <SectionTitle>Abilities</SectionTitle>
      {details.abilities.map((ability, index) => (
        <ListItem key={index}>
          <Text
            fontWeight={FONT_WEIGHT.SEMIBOLD}
            size={SIZE.MEDIUM}
            color={color.white}>
            {capitalizeFirstLetter(ability.name)}
          </Text>
        </ListItem>
      ))}

      <SectionTitle>Base Stats</SectionTitle>
      {details.stats.map((stat, index) => (
        <Slide key={index} title={stat.name} value={stat.value} />
      ))}
    </ContainerDetails>
  );
};

export default PokemonDetailsList;

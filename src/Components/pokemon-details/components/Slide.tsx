import React, {useMemo} from 'react';
import {RowSize, RowSlide, SlideGray, SlideStats} from '../styles';
import Text, {FONT_WEIGHT, SIZE} from '../../shared/Text';
import {color} from '../../../styles';
import { capitalizeFirstLetter } from '../../../utils/pokemonUtils';

interface SlideProps {
  value: number;
  title: string;
}

const Slide = ({title, value}: SlideProps) => {
  const stats = useMemo(() => {
    if (title === 'special-attack') {return 'Sp. Attack';}
    if (title === 'special-defense') {return 'Sp. Defense';}
    return capitalizeFirstLetter(title);
  }, [title]);

  return (
    <RowSlide>
      <RowSize flex={1.3}>
        <Text
          size={SIZE.NORMAL}
          fontWeight={FONT_WEIGHT.MEDIUM}
          color={color.white}>
          {stats}
        </Text>
        <Text
          size={SIZE.SMALL}
          fontWeight={FONT_WEIGHT.BOLD}
          color={color.white}>
          {value}
        </Text>
      </RowSize>

      <RowSize flex={2}>
        <SlideGray />
        <SlideStats stats={value} />
      </RowSize>
    </RowSlide>
  );
};

export default Slide;

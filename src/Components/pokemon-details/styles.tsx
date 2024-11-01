import {scale} from '../../utils/platformUtils';
import styled from 'styled-components/native';
import Text from '../shared/Text';
import {color} from '../../styles';
interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor || 'white'};
  width: 100%;
`;

export const BackButtonComponent = styled.TouchableOpacity`
  padding: ${scale(4)}px;
`;

export const Header = styled.View`
  width: 100%;
  padding-horizontal: ${scale(18)}px;
  padding-vertical: ${scale(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ListItem = styled.View`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${scale(8)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const PokemonImageContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${scale(16)}px;
`;

export const PokemonImage = styled.Image`
  width: ${scale(235)};
  height: ${scale(235)};
  align-self: center;
  z-index: 10;
`;

export const PokeballImage = styled.Image`
  width: ${scale(250)};
  height: ${scale(250)};
  align-self: center;
  opacity: 0.4;
  top: ${scale(24)};
  position: absolute;
  z-index: 0;
`;

export const PokemonTypes = styled.View`
  padding: ${scale(6)}px;
  padding-right: ${scale(12)}px;
  padding-left: ${scale(12)}px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.25);
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: ${scale(16)}px;
  margin-left: ${scale(16)};
  margin-right: ${scale(16)};
`;

export const RowTypes = styled.View`
  padding: ${scale(6)}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 95%;
`;

export const RowSlide = styled.View`
  width: 100%;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${scale(6)}px;
  flex-direction: row;
  align-items: center;
`;

export const RowSize = styled.View<{flex: number}>`
  flex: ${({flex}) => flex};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SlideGray = styled.View`
  width: 100%;
  height: ${scale(3)}px;
  background-color: ${color.gray};
  margin-left: ${scale(10)}px;
  position: absolute;
  top: 0;
  align-self: center;
`;

export const SlideStats = styled.View<{stats: number}>`
  width: ${({stats}) => stats}%;
  height: ${scale(3)}px;
  background-color: ${color.white};
  margin-left: ${scale(10)}px;
  position: absolute;
  top: 0;
  align-self: center;
  z-index: 100;
`;

export const ContainerDetails = styled.View`
  padding: ${scale(8)}px;
`;

export const RowInfo = styled.View`
  margin-top: ${scale(16)}px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const CardInfo = styled.View`
  padding: ${scale(8)}px;
  margin: ${scale(8)}px;
`;

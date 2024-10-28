import {Platform, StyleSheet} from 'react-native';
import {scale, getWindowWidth} from '../../utils/platformUtils';
import styled from 'styled-components/native';
import { color } from '../../styles';

const width = getWindowWidth() - scale(16);

export const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    height: '100%',
  },
  pokeball: {
    tintColor: 'white',
  },
});

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

interface CardProps {
  backgroundColor?: string;
}

export const Card = styled.TouchableOpacity<CardProps>`
  background-color: ${({backgroundColor}) => backgroundColor || 'white'};
  margin: ${scale(8)}px;
  padding: ${scale(16)}px;
  border-radius: 8px;
  flex-direction: row;
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 1px;
      shadow-opacity: 0.22;
      shadow-radius: 2.22px;
    `,
    android: `
      elevation: 3;
    `,
  })}
`;

export const PokemonImage = styled.Image`
  width: ${scale(110)};
  height: ${scale(110)};
  align-self: center;
  z-index: 10;
`;

export const DetailsSpace = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-left: ${scale(8)}px;
`;

export const PokemonTypes = styled.View`
  padding: ${scale(6)}px;
  padding-right: ${scale(10)}px;
  padding-left: ${scale(10)}px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.25);
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: ${scale(14)}px;
`;

export const PokeballImage = styled.Image`
  width: ${scale(125)};
  height: ${scale(125)};
  align-self: center;
  opacity: 0.25;
  position: absolute;
  z-index: 0;
  right: ${scale(13)}px;
`;

export const InputContainer = styled.View`
  width: ${width}px;
  padding-left: ${scale(16)}px;
  padding-right: ${scale(16)}px;
  padding-top: ${scale(12)}px;
  padding-bottom: ${scale(12)}px;
  flex-direction: row;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.gray};
  margin-bottom: ${scale(8)}px
`;

export const Input = styled.TextInput`
  width: 80%;
  font-size: ${scale(18)}px;
  color: black;
  font-weight: 600;
`;

export const ClearTextButton = styled.TouchableOpacity`
  padding: ${scale(2)}px;
`;

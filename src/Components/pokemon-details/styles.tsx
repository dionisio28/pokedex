import {scale} from '../../utils/platformUtils';
import styled from 'styled-components/native';
interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor || 'white'};
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
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

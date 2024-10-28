import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BackButtonComponent} from '../styles';
import {color} from '../../../styles';
import { useNavigation } from '@react-navigation/native';
const BacKButton = () => {
  const { goBack } = useNavigation();
  return (
    <BackButtonComponent onPress={goBack}>
      <Icon name="arrow-back" size={24} color={color.white} />
    </BackButtonComponent>
  );
};

export default BacKButton;

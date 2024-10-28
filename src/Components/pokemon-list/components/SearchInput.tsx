import React from 'react';
import {ClearTextButton, Input, InputContainer} from '../styled';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {color} from '../../../styles';

interface SearchInputProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchInput = ({searchTerm, onSearch}: SearchInputProps) => {
  return (
    <InputContainer>
      <Input placeholder="Seach your pokemon here..." value={searchTerm} onChangeText={onSearch} />
      <ClearTextButton onPress={() => onSearch('')}>
        <Icon name="clear" size={30} color={color.black} />;
      </ClearTextButton>
    </InputContainer>
  );
};

export default SearchInput;

import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.main : 'transparent'};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
  margin-left: 2px;

  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.main : 'transparent'};
`;

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const Text = styled.Text`
  color: #000000;
  font-size: 14px;
`;

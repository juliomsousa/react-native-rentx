import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

export const Button = ({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  style,
  ...rest
}: Props) => {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      color={color}
      enabled={enabled}
      style={[style, { opacity: !enabled || loading ? 0.5 : 1 }]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

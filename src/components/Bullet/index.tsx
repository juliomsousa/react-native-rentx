import React from 'react';
import { Container } from './styles';

interface Props {
  active?: boolean;
}

export const Bullet = ({ active = false }: Props) => {
  return <Container active={active} />;
};

import React from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styles';

import loadingCar from '../../assets/loadingCar.json';

export const LoadAnimated = () => {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
};

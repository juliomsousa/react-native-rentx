import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

export const Home = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [carsList, setCarsList] = useState<CarDTO[]>([]);

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car });
  };

  useEffect(() => {
    let isMounted = true;

    const getCars = async () => {
      try {
        const response = await api.get('cars');
        if (response.data) {
          if (isMounted) {
            setCarsList(response.data);
          }
        }
      } catch (error) {
        console.log('error on getCars', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getCars();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          {!loading && <TotalCars>Total de {carsList.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarList
          data={carsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};

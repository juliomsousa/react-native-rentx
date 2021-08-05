import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { BackButton } from '../../components/BackButton';
import { api } from '../../services/api';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car';
import { LoadAnimated } from '../../components/LoadAnimated';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export const MyCars = () => {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('rentals');
        setCars(response.data);
      } catch (error) {
        console.log('error on getting user cars', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [isScreenFocused]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>
                      {format(new Date(item.start_date), 'dd/MM/yyyy')}
                    </CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>
                      {format(new Date(item.end_date), 'dd/MM/yyyy')}
                    </CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { Car as ModelCar } from '../../database/model/Car';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';

export const Home = () => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [loading, setLoading] = useState(true);
  const [carsList, setCarsList] = useState<ModelCar[]>([]);

  const handleCarDetails = (car: ModelCar) => {
    navigation.navigate('CarDetails', { car });
  };

  const offlineSyncronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;
        console.log('### SINCRONIZAÇÃO ###', latestVersion);
        console.log(changes);

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        console.log('### changes ###');
        console.log([...Object.keys(changes)]);
        
        const user = changes.users;

        await api
          .post('/users/sync', user)
          // .then(console.log)
          .catch(console.error);
      },
      // sendCreatedAsUpdated: true
    });
  };

  useEffect(() => {
    let isMounted = true;

    const getCars = async () => {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCarsList(cars);
          setLoading(false);
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

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSyncronize();
    }
  }, [netInfo.isConnected]);

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

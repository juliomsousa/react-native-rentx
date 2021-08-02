import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg height={24} width={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
};
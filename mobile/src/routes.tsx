import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Main from './pages/Main';

import tindevLogo from './assets/logo.png';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Realize seu login',
            headerStyle: {
              backgroundColor: '#df4723',
            },
            headerTintColor: '#FFF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

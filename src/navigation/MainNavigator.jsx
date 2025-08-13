import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminNavigator from './AdminNavigator';
import UserSelection from '../screens/UserSelection';
import StudentNavigator from './StudentNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserSelection"
          component={UserSelection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminNavigator"
          component={AdminNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentNavigator"
          component={StudentNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Park from './pages/park';
import Search from './pages/search'

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="park" component={Park} />
        <AppStack.Screen name="Search" component={Search} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

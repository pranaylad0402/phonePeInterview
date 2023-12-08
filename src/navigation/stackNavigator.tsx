import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductDetails, ProductList} from '../screens/index.screen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};


import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmOrder from './ConfirmOrder';
import OrderTrack from './OrderTrack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName='AllOrders'>
    <Stack.Screen name="AllOrders" component={ConfirmOrder} />
    <Stack.Screen name="OrderDetail" component={OrderTrack} />
  </Stack.Navigator>
  )
}

export default RootStack
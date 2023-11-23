import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bau from '../../../screens/Bau';
import Inventory from '../../../screens/Inventory';
import React from 'react';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Bau: any;
  Inventory: any;
};

export function BottonTagRouts() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Inventory" component={Inventory} />

      <Tab.Screen name="Bau" component={Bau} />
    </Tab.Navigator>
  );
}

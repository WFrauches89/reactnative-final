import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bau from '../../../screens/Bau';
import Inventory from '../../../screens/Inventory';
import React from 'react';
import images from '../../../../assets/images';
import { Image } from 'react-native-animatable';
import Ferreiro from '../../../screens/Ferreiro';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Bau: any;
  Inventory: any;
  Ferreiro: any;
};

export function BottonTagRouts() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
          color: '#FFF',
        },
        tabBarStyle: {
          backgroundColor: '#383838',
        },
        tabBarActiveBackgroundColor: '#1e1e1e',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: () => (
            <Image
              source={images.bag}
              style={{ width: 40, height: 40, marginBottom: 2 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Bau"
        component={Bau}
        options={{
          tabBarIcon: () => (
            <Image
              source={images.bau}
              style={{ width: 40, height: 40, marginBottom: 2 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ferreiro"
        component={Ferreiro}
        options={{
          tabBarIcon: () => (
            <Image
              source={images.fornalha}
              style={{ width: 40, height: 40, marginBottom: 2 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

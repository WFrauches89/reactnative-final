import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inventory from '../../screens/Inventory';
import Bau from '../../screens/Bau';

const Stack = createNativeStackNavigator();

export default function RoutesAuth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Bau"
        component={Bau}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

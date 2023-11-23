import RoutesAuth from './AuthStack';
import RoutesNotAuth from './Stack';
import { useAuth } from '../Context/Auth';
import { View, Text } from 'react-native';

export default function Routes() {
  const { authData, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Carregando app ...</Text>
      </View>
    );
  }
  return <>{authData ? <RoutesAuth /> : <RoutesNotAuth />}</>;
}

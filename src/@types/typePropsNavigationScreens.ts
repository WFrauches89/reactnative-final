import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Cadastro: undefined;
};

type NavigateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome' | 'Login' | 'Cadastro'
>;

export type Props = {
  navigation: NavigateScreenNavigationProp;
};

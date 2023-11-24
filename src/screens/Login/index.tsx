import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlatListTextInput from '../../components/FlatListTextInput/index';
import { Props } from '../../@types/typePropsNavigationScreens';

const Login: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={'fadeInLeft'}
        delay={500}
        style={styles.header}
      >
        <Text style={styles.headerText}>Bem Vindo</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.headerText}> Back </Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation={'fadeInUp'} delay={500} style={styles.form}>
        <FlatListTextInput navigation={navigation} />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d2424e0',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginBottom: '7%',
    paddingStart: '7%',
    paddingEnd: '7%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#97900e',
  },
  form: {
    flex: 1,
    backgroundColor: '#202020',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
});

export default Login;

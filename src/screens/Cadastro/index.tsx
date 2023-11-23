import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlatListTextInputCad from '../../components/FlatListTextInputCad/index';
import { Props } from '../../@types/typePropsNavigationScreens';

const Cadastro: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={'fadeInLeft'}
        delay={500}
        style={styles.header}
      >
        <Text style={styles.headerText}>Cadastrando ... </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.headerText}> Back </Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation={'fadeInUp'} delay={500} style={styles.form}>
        <FlatListTextInputCad />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8b0d99',
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
    backgroundColor: '#000',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
});

export default Cadastro;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlatListTextInputCad from '../../components/FlatListTextInputCad/index';
import { Props } from '../../@types/typePropsNavigationScreens';
import { styles } from './styles';

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

export default Cadastro;

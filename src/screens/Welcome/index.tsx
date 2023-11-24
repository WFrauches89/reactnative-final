import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../../../assets/dadoWelcome.png';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation={'fadeInLeft'}
          iterationCount={1}
          source={logo}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={styles.containerForm}
      >
        <Text style={styles.containerFormTitle}>
          Inicie sua aventura neste novo universo!
        </Text>
        <Text style={styles.containerFormSubTitle}>
          Faça seu login para iniciar esta jornada!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.containerFormAcess}
        >
          <Text style={styles.containerFormAcessText}> Join </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d2424e0',
  },
  containerLogo: {
    flex: 1,
    backgroundColor: '#3d2424e0',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  containerimgDado: {},
  containerForm: {
    flex: 1,
    backgroundColor: '#202020',
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  containerFormTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  containerFormSubTitle: {
    color: '#fff',
    textAlign: 'center',
  },
  containerFormAcess: {
    position: 'absolute',
    backgroundColor: '#594875',
    borderRadius: 50,
    paddingVertical: 8,
    width: '100%',
    alignSelf: 'center',
    bottom: '25%',
    alignItems: 'center',
  },
  containerFormAcessText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

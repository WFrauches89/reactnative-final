import React, { useState } from 'react';
import {
  FlatList,
  KeyboardTypeOptions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { style } from './style';
import { Ionicons } from '@expo/vector-icons';
import seta from '../../assets/img/seta-removebg-preview.png';
import { useAuth } from '../../Context/Auth';
import api from '../../services/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Props } from '../../@types/typePropsNavigationScreens';

interface OutputItem {
  id: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  valor: string;
  secureTextEntry: boolean;
}

const FlatListTextInput: React.FC<Props> = ({ navigation }) => {
  const { logar, setUserLogado } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const loginUser = async () => {
    const response = await api.get(`/user?email=${email}`);
    if (response.data.length != 0) {
      if (response.data[0].senha == password) {
        AsyncStorage.setItem(
          '@AuthData',
          JSON.stringify({
            id: response.data[0].id,
            nome: response.data[0].nome,
          }),
        );
        logar({
          id: response.data[0].id,
          nome: response.data[0].nome,
        });
        setUserLogado({ id: response.data[0].id, nome: response.data[0].nome });
        // setErrorSenha(false);
        // setErrorEmail(false);
        // navigate('/');
      } else {
        // setErrorEmail(false);
        // setErrorSenha(true);
      }
    } else {
      //   setErrorSenha(false);
      //   setErrorEmail(true);
    }
  };

  const outputs: OutputItem[] = [
    {
      id: '00001',
      placeholder: 'Email ou CPF',
      keyboardType: 'email-address',
      valor: email,
      secureTextEntry: false,
    },
    {
      id: '00002',
      placeholder: 'Senha',
      keyboardType: 'default',
      valor: password,
      secureTextEntry: hidePass,
    },
  ];

  const renderItem = ({ item }: { item: OutputItem }) => (
    <TextInput
      style={item.id === '00001' ? style.input : style.input2}
      placeholder={item.placeholder}
      placeholderTextColor="#FFF"
      keyboardType={item.keyboardType}
      value={item.valor}
      secureTextEntry={item.secureTextEntry}
      onChangeText={(text) => handleInputChange(item.id, text)}
    />
  );

  const handleInputChange = (id: string, text: string) => {
    if (id === '00001') {
      setEmail(text);
    } else if (id === '00002') {
      setSenha(text);
    }
  };

  return (
    <View>
      <FlatList
        data={outputs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={style.inputArea}>
        <TouchableOpacity
          style={style.icon}
          onPress={() => setHidePass(!hidePass)}
        >
          {hidePass ? (
            <Ionicons name="eye" color="#FFF" size={25} />
          ) : (
            <Ionicons name="eye-off" color="#FFF" size={25} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={style.forget}> Novo por aqui, cadastre-se!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => loginUser()}>
        <View style={style.acess}>
          <Text style={style.acessText}> ACESSAR </Text>
          <Image source={seta} style={style.imgSeta} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FlatListTextInput;

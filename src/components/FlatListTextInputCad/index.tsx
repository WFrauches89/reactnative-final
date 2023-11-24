import React, { useState } from 'react';
import {
  Alert,
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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/Auth';
import api from '../../services/api/api';

interface OutputItem {
  id: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  valor: string;
  secureTextEntry: boolean;
}

const FlatListTextInput = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [password2, setSenha2] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);

  const getUserPorEmail = async () => {
    const response = await api.get(`user?email=${email}`);
    return response.data;
  };
  const addUser = async () => {
    const response = await getUserPorEmail();

    if (response.length == 0) {
      if (password == password2) {
        if (
          userName != '' &&
          email != '' &&
          password != '' &&
          password2 != ''
        ) {
          api.post('/user', {
            nome: userName,
            email,
            senha: password,
            recursos: {
              gold: '10000',
              energia: '20',
              gema: 0,
            },
            itens: [],
            itensEquipados: [],
            personagens: [],
            personagemEquipado: [],
            itensUnindo: [],
          });
          alert('Usuario cadastrado com sucesso.');
        } else {
          alert('Por favor preencha todos os campos.');
        }
      } else {
        alert('Senha e confirma senha precisam ser iguais');
      }
    } else {
      alert('Email já cadastrado');
    }
  };

  const outputs: OutputItem[] = [
    {
      id: '00004',
      placeholder: 'Usuario',
      keyboardType: 'default',
      valor: userName,
      secureTextEntry: false,
    },
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
      secureTextEntry: hidePass2,
    },
    {
      id: '00003',
      placeholder: 'Confirma Senha',
      keyboardType: 'default',
      valor: password2,
      secureTextEntry: hidePass,
    },
  ];

  const renderItem = ({ item }: { item: OutputItem }) => (
    <TextInput
      style={
        item.id === '00001'
          ? style.input
          : item.id === '00002'
          ? style.input2
          : item.id === '00003'
          ? style.input2
          : style.input
      }
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
    } else if (id === '00003') {
      setSenha2(text);
    } else if (id === '00004') {
      setUserName(text);
    }
  };

  return (
    <View>
      <FlatList
        data={outputs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={style.inputArea2}>
        <TouchableOpacity
          style={style.icon2}
          onPress={() => setHidePass2((hp) => !hp)}
        >
          {hidePass2 ? (
            <Ionicons name="eye" color="#FFF" size={25} />
          ) : (
            <Ionicons name="eye-off" color="#FFF" size={25} />
          )}
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity
        onPress={() => {
          addUser();
        }}
      >
        <Text style={style.forget}> Registrar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlatListTextInput;

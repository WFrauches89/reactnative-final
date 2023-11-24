import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import HeaderComponent from '../HeaderComponent';
import api from '../../services/api/api';
import { useAuth } from '../../Context/Auth';
import images from '../../../assets/images';

interface userprops {
  id: number;
  nome: string;
  email: string;
  senha: string;
  recursos: recursosprops;
}

interface recursosprops {
  gold: number;
  energia: number;
  gema: number;
}

export default function Header() {
  const [userRecursos, setuserRecursos] = React.useState<userprops>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    recursos: {
      gold: 0,
      energia: 0,
      gema: 0,
    },
  });
  const { refreshPage, userLogado, signOut } = useAuth();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserData();
    }, 1000);
    fetchUserData();

    return () => {
      clearTimeout(timer);
    };
  }, [refreshPage]);

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/user/${userLogado.id}`);
      const responserecurso = response.data;
      setuserRecursos(responserecurso);
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
  };

  return (
    <View style={styles.viewheader}>
      <HeaderComponent titulo="User" nome={userRecursos.nome} valor={null} />
      <HeaderComponent
        titulo="Gold"
        nome=""
        valor={userRecursos.recursos.gold}
      />
      <HeaderComponent
        titulo="Gemas"
        nome=""
        valor={userRecursos.recursos.gema}
      />
      <HeaderComponent
        titulo="Energia"
        nome=""
        valor={userRecursos.recursos.energia}
      />
      <TouchableOpacity style={styles.buttonSair} onPress={signOut}>
        <Image style={styles.imagSair} source={images.placa1} />
      </TouchableOpacity>
    </View>
  );
}

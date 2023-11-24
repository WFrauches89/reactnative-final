import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import HeaderComponent from '../HeaderComponent';
import api from '../../services/api/api';
import { useAuth } from '../../Context/Auth';

interface recursosprops {
  gold: number;
  energia: number;
  gema: number;
}

export default function Header() {
  const [recurso, setrecursos] = React.useState<recursosprops>({
    gold: 0,
    energia: 0,
    gema: 0,
  });
  const { refreshPage, userLogado } = useAuth();

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
      const responserecurso = response.data.recursos;
      setrecursos(responserecurso);
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
  };

  const processarArray = (itens, idDoItem, rarity) => {
    // Filtrar o array para incluir apenas objetos com o valor e importancia alvo
    const objetosAlvo = itens.filter(
      (objeto) => objeto.valor === idDoItem && objeto.importancia === rarity,
    );

    // Se existem pelo menos três objetos alvo
    if (objetosAlvo.length >= 3) {
      // Filtrar o array original para remover os três objetos alvo
      const novoArray = itens.filter(
        (objeto) =>
          !(objeto.valor === idDoItem && objeto.importancia === rarity),
      );

      // Adicionar um novo objeto com valor e importancia atualizados
      novoArray.push({
        valor: idDoItem,
        importancia: rarity + 1,
      });

      return novoArray;
    }

    // Se não existem três objetos alvo, retornar o array original
    return itens;
  };

  // Exemplo de uso
  const arrayDeObjetos = [
    { valor: 3, importancia: 2 },
    { valor: 1, importancia: 3 },
    { valor: 1, importancia: 3 },
    { valor: 4, importancia: 5 },
    { valor: 3, importancia: 2 },
    { valor: 3, importancia: 2 },
    { valor: 1, importancia: 3 },
    { valor: 3, importancia: 2 },
  ];

  const novoArray = processarArray(arrayDeObjetos, 1, 3);

  console.log(novoArray);

  return (
    <View style={styles.viewheader}>
      <HeaderComponent titulo="User" nome="kkkk" valor={null} />
      <HeaderComponent titulo="Gold" nome="" valor={recurso.gold} />
      <HeaderComponent titulo="Gemas" nome="" valor={recurso.gema} />
      <HeaderComponent titulo="Energia" nome="" valor={recurso.energia} />
    </View>
  );
}

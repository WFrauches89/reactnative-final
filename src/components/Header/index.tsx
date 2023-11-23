import React from "react";
import { View, Text, } from "react-native";
import { styles } from "./style";
import HeaderComponent from "../HeaderComponent";
import api from "../../services/api/api";

interface recursosprops {
    gold: number;
    energia: number;
    gema: number;
}

export default function Header(){
const[recurso , setrecursos] = React.useState<recursosprops>({
    gold: 0,
    energia: 0,
    gema: 0,
});
React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/1`);
        const responserecurso = response.data.recursos;
        setrecursos(responserecurso);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    };
  

    fetchUserData();
  }, [recurso]);

return(
    <View style={styles.viewheader}>
        <HeaderComponent titulo="User" nome='kkkk' valor={null}/>
        <HeaderComponent titulo="Gold" nome='' valor={recurso.gold}/>
        <HeaderComponent titulo="Gemas" nome='' valor={recurso.gema}/>
        <HeaderComponent titulo="Energia" nome='' valor={recurso.energia}/>
    </View>
);
}
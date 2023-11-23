import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface headerprops {
    titulo: string;
    nome: string;
    valor: number;
}

export default function HeaderComponent({titulo, valor, nome} : headerprops){
    return(
        <>
        <View style={styles.viewtext}>
            <Text style={styles.texttop}>{titulo}</Text>
            {(valor || valor === 0) && <Text style={styles.textbotton}>{valor}</Text>}
            {nome && nome !== '' && <Text style={styles.textbotton}>{nome}</Text>}
        </View>
        </>
    )
        
    
}
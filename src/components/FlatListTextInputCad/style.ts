import { StyleSheet, Platform } from "react-native"


export const style = StyleSheet.create({

    input: {
        marginTop: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(78, 233, 235, 0.4)',
        backgroundColor: "rgba(255, 255, 255, 0.0)", // alterar para transparente
        fontSize: 20,
        padding: Platform.OS === 'ios' ? 10 : 10,
        borderRadius: 7,
        color:'#FFFFFF',
        
    },

    inputArea:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    inputArea2:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    input2:{
        width: '90%',
        marginTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(78, 233, 235, 0.4)',
        backgroundColor: "rgba(255, 255, 255, 0.0)", // alterar para transparente
        fontSize: 25,
        padding: Platform.OS === 'ios' ? 10 : 10,
        borderRadius: 7,
        color:'#FFFFFF',
    },

    icon: {
        marginTop: -28,
        marginBottom: 10,
        marginLeft: 329,
        width: '10%',
        borderBottomWidth: 0.7,
        borderBottomColor: 'rgba(78, 233, 235, 0.4)',
    },
    icon2: {
        marginTop: -197,
        marginBottom: 10,
        marginLeft: 329,
        width: '10%',
        borderBottomWidth: 0.7,
        borderBottomColor: 'rgba(78, 233, 235, 0.4)',
    },
    acess:{
        flexDirection: 'row',
    },
    acessText:{
        color:'#0ca4a4', 
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 250,
    },
    imgSeta: {
        
        marginTop: 45,
        width: 25,
        height: 13,
    
    },
    forget:{
        color:'#a1a1a1', 
        marginTop: 20,
        fontSize: 14,
        fontWeight: '400',
        paddingRight: 250,
    },
   

})
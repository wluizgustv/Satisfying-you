import { StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const styles = StyleSheet.create({
    forms: {
      position: 'relative',
      top: 180,
      paddingTop: 30,
      
    },
    busca: {
      paddingLeft: 100,
    },
    container: {
      backgroundColor: '#372775',
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'flex-start',
      gap: 20, 
    },
    botao: {
      position: 'absolute',
      top: '90%'
    },
    content1: {
      color:'black'
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 1,
      marginBottom: 10,
    },
    imagem:{
      backgroundColor: 'white',
      width: 330,
      height: 150,
      marginLeft: 10,
    },
    texto:{
      color: 'white',
      marginBottom: 10,
    }
  });

export default styles;
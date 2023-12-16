import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
      backgroundColor: '#372775',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    },

    aninhado: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'flex-start',
        marginLeft: 50
    }, 

    image:{
        top: 100,
        height: '40%',
        width: '80%',
        marginBottom: 100
    },

    text: {
        color: 'white',
        paddingLeft: 10,
        fontSize: 40,
        fontFamily: 'AveriaLibre-Regular'
    }, 

    excelent: {
        width: 45,
        height: 45,
        backgroundColor: '#F1CE7E'
    },

    good: {
        width: 45,
        height: 45,
        backgroundColor: '#6994FE'
    },

    regular: {
        width: 45,
        height: 45,
        backgroundColor: '#5FCDA4'
    },

    bad: {
        width: 45,
        height: 45,
        backgroundColor: '#EA7288'
    },

    terrible: {
        width: 45,
        height: 45,
        backgroundColor: '#53D8D8'
    }

  });

export default styles;
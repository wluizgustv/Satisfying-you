import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Navbar } from '../../components/Navbar';
import styles from './styles';
import { useCallback } from 'react';

export default function AcoesPesquisa(props) {
  const { navigate } = useNavigation();
  const route = useRoute()
  const id  = route.params.id
  const nome  = route.params.nome
  const terrivel  = route.params.terrivel
  const ruim = route.params.ruim
  const neutro = route.params.neutro
  const bom  = route.params.bom
  const otimo = route.params.otimo

  const goToModificarPesquisa = useCallback(
    () => {
      navigate('ModificarPesquisa', { id });
    },
    [navigate],
  );
  const goToColeta = useCallback(
    () => {
      navigate('Coleta', { id, nome, terrivel, ruim, neutro, bom, otimo });
    },
    [navigate],
  );
  const goToRelatorio = useCallback(
    () => {
      navigate('Relatorio', { id, nome, terrivel, ruim, neutro, bom, otimo });
    },
    [navigate],
  );

  return (
    <View style={styles.container}>
        <Navbar title={nome} top={-110}></Navbar>
        <TouchableOpacity style={styles.button} onPress={goToModificarPesquisa}>
            <Icon name="edit-document" size={48} color="#F9F9F9" /> 
            <Text style={styles.texto}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToColeta}>
            <Icon name="devices" size={48} color="#F9F9F9" /> 
            <Text style={styles.texto}>Coletar dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToRelatorio}>
            <Icon name="donut-large" size={48} color="#F9F9F9" /> 
            <Text style={styles.texto}>Relatório</Text>
        </TouchableOpacity>
    </View>
  );
}

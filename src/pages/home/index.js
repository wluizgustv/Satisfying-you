import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import  ButtonGeral  from '../../components/ButtonGeral';
import InputTexto from '../../components/InputTexto';
import Card from '../../components/Card';
import styles from './styles';
import { onSnapshot } from 'firebase/firestore';
import { getQuerySurvey } from '../../services/firestoreService';
import { useAuth } from '../../context/authcontext';
import { useNavigation } from '@react-navigation/native';

export default function PaginaPrincipal(props) {
  const { navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [surveys, setSurveys] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    onSnapshot(getQuerySurvey(), querySnapshot => {
      const s = [];

      querySnapshot.forEach(doc => {
        s.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setSurveys(s ?? []);
      setFiltered(s ?? [])
    });
  }, []);

  const pesquisa = (text) => {
    setSearchQuery(text);
    if(searchQuery) {
      setFiltered(surveys.filter(survey =>
        survey.nome.toLowerCase().includes(text),
      ))
    } else {
      setFiltered(surveys)
    }
  }

  const goToNovaPesquisa = useCallback(() => {
    props.navigation.navigate('NovaPesquisa')
  }, [])

  const goToAcoesPesquisa = useCallback(
    (id, nome, terrivel, ruim, neutro, bom, otimo) => {
      navigate('AcoesPesquisa', { id, nome, terrivel, ruim, neutro, bom, otimo });
    },
    [navigate],
  );

  return (
    <View style={styles.container}>
        <InputTexto placeholder={'Insira o termo de busca'} size={320} onChangeText={pesquisa} />
        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.squaresContainer}>
            {filtered && (filtered.map((survey) => 
              <Card key={survey.id} style={styles.div} text={survey.nome} data={survey.data} onPress={() => goToAcoesPesquisa(survey.id, survey.nome, survey.terrivel, survey.ruim, survey.neutro, survey.bom, survey.otimo)}/>))}
          </View>
      </ScrollView>
      <ButtonGeral style={styles.botao} title={'Nova Pesquisa'} color={'#37BD6D'} width={350} onPress={goToNovaPesquisa}/>
    </View>
  );
}

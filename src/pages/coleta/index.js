import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import styles from "./styles";
import { useCallback } from 'react';
import { atualizarSurvey } from "../../services/firestoreService";

export default function Coleta(props) {
    const route = useRoute()
    const id  = route.params.id
    const nome  = route.params.nome
    const terrivel  = route.params.terrivel
    const ruim = route.params.ruim
    const neutro = route.params.neutro
    const bom  = route.params.bom
    const otimo = route.params.otimo

    var t  = terrivel
    var r = ruim
    var n = neutro
    var b  = bom
    var o = otimo

    const updateSurvey = useCallback(async (button) => {
        try {
          let dados = {}
          if(button === 1){
            o++
            dados = { otimo: o }
          }
          if(button === 2){
            b++
            dados = { bom: b }
          }
          if(button === 3){
            n++
            dados = { neutro: n }
          }
          if(button === 4){
            r++
            dados = { ruim: r }
          }
          if(button === 5){
            t++
            dados = { terrivel: t }
          }
          const survey = await atualizarSurvey(id, dados);
          console.log(dados)
          props.navigation.navigate('Agradecimento');
        } catch (error) {
          console.error("Erro durante a criacao de pesquisa:", error.message);
        }
      }, []);

    return(
        <View style={styles.container}>
            <Text style={styles.texto}>O que você achou do {nome}</Text>

            <TouchableOpacity style={styles.botao} onPress={() => updateSurvey(1)}>
                <Icon name="sentiment-very-satisfied" size={70} color="#25BC22" /> 
                <Text style={styles.textoBotao}>Excelente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => updateSurvey(2)}>
                <Icon name="sentiment-satisfied-alt" size={70} color="#37BD6D" /> 
                <Text style={styles.textoBotao}>Bom</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => updateSurvey(3)}>
                <Icon name="sentiment-neutral" size={70} color="#FFC632" />
                <Text style={styles.textoBotao}>Neutro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => updateSurvey(4)}>
                <Icon name="sentiment-dissatisfied" size={70} color="#FF360A" />
                <Text style={styles.textoBotao}>Ruim</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => updateSurvey(5)}>
                <Icon name="sentiment-very-dissatisfied" size={70} color="#D71616" />
                <Text style={styles.textoBotao}>Péssimo</Text>
            </TouchableOpacity>

        </View>
    )
}
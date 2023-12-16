import { View, Image, Text, ScrollView } from "react-native";
import styles from "./styles";
import { Navbar } from "../../components/Navbar";
import { useRoute } from "@react-navigation/native";
import { PieChart } from 'react-native-svg-charts'

export default function Relatorio() {
    const route = useRoute()
    const nome  = route.params.nome
    const terrivel  = route.params.terrivel
    const ruim = route.params.ruim
    const neutro = route.params.neutro
    const bom  = route.params.bom
    const otimo = route.params.otimo

    const data = [
        {
            key: 1,
            value: otimo,
            svg: { fill: '#F1CE7E' },
        },
        {
            key: 2,
            value: bom,
            svg: { fill: '#6994FE' }
        },
        {
            key: 3,
            value: neutro,
            svg: { fill: '#5FCDA4' }
        },
        {
            key: 4,
            value: ruim,
            svg: { fill: '#EA7288' }
        },
        {
            key: 5,
            value: terrivel,
            svg: { fill: '#53D8D8' }
        }
    ]

    return(
            <View style={styles.container}>
                <Navbar title={`Relatório ${nome}`} top={0}></Navbar>
                <PieChart
                    style={styles.image}
                    outerRadius={'70%'}
                    innerRadius={10}
                    data={data}
                />
                    
                    <View style={styles.aninhado}>
                        <View style={styles.excelent}></View>
                        <Text style={styles.text}>Excelente</Text>
                    </View>

                    <View style={styles.aninhado}>
                        <View style={styles.good}></View>
                        <Text style={styles.text}>Bom</Text>
                    </View>

                    <View style={styles.aninhado}>
                        <View style={styles.regular}></View>
                        <Text style={styles.text}>Neutro</Text>
                    </View>

                    <View style={styles.aninhado}>
                        <View style={styles.bad}></View>
                        <Text style={styles.text}>Ruim</Text>
                    </View>

                    <View style={styles.aninhado}>
                        <View style={styles.terrible}></View>
                        <Text style={styles.text}>Pessimo</Text>
                    </View>
                
            </View>
    )
}
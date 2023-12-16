import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import ButtonGeral from '../../components/ButtonGeral';
import InputTexto from '../../components/InputTexto';
import { Navbar } from '../../components/Navbar';
import styles from './styles';
import { createSurvey } from '../../services/firestoreService';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NovaPesquisa(props) {

  const [nome, setNome] = useState('')
  const [data, setData] = useState('')
  const [nameError, setNomeError] = useState('')

  const [srcImg, setSrcImg] = useState('')
  const [img, setImg] = useState()

  const tirarFoto = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back', quality: 1})
    .then(
      (result) => {
        setSrcImg(result.assets[0].uri)
        setImg(result.assets[0])
      })
    .catch(
      (error) => {
        console.log("Erro ao capturar imagem: " + JSON.stringfy(error))
    })
  }

  const handleNameChange = (text) => {
    setNome(text);
    const regex = /^[a-zA-Z0-9._-]/
    setNomeError(regex.test(text) ? "" : "Campo Obrigatorio")
  }

  const handleDataChange = (text) => {
    setData(text);
  }

  const handleImgChange = (text) => {
    setImg(text);
  }

  const newSurvey = async () => {
    try {
      const dados = { nome, data, img}
      const survey = await createSurvey(dados);
      console.log(survey)
      props.navigation.navigate('Drawer');
    } catch (error) {
      console.error("Erro durante a criacao de pesquisa:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title={'Nova pesquisa'} ></Navbar>
      <View style={styles.forms}>
        <InputTexto secure={false} title={'Nome'} size={350} borderRadius={8} onChangeText={handleNameChange} error={nameError}/>
        <InputTexto secure={false} title={'Data'} size={350} borderRadius={8} onChangeText={handleDataChange}/>
        <Text style={styles.texto}>Imagem</Text> 
        <TouchableOpacity onPress={tirarFoto}>
        <Image source={srcImg ? { uri: srcImg } : null} style={styles.imagem} />
        </TouchableOpacity>
      </View>
      <View style={styles.botao}>
        <ButtonGeral title={'CADASTRAR'} color={'#37BD6D'} width={350} onPress={newSurvey} />
      </View>
    </View>
  );
}

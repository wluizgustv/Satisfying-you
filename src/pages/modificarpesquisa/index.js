import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ButtonGeral from '../../components/ButtonGeral';
import InputTexto from '../../components/InputTexto';
import { launchCamera } from 'react-native-image-picker';
import styles from './styles';
import { Navbar } from '../../components/Navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from '../../components/ModalApagar';
import { useState } from 'react';
import { atualizarSurvey, getSurveyById } from '../../services/firestoreService';
import { useRoute } from '@react-navigation/native';

export default function ModificarPesquisa(props) {
  const route = useRoute()
  const id = route.params.id
  const [nome, setNome] = useState('')
  const [data, setData] = useState('')
  const [img, setImg] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [srcImg, setSrcImg] = useState('')
  const goToPaginaPrincipal = () => {
    props.navigation.navigate('PaginaPrincipal')
  }

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
  }

  const handleDataChange = (text) => {
    setData(text);
  }

  const handleImgChange = (text) => {
    setImg(text);
  }

  const updateSurvey = async () => {
    try {
      const dados = { nome, data, img }
      const survey = await atualizarSurvey(id, dados);
      console.log(survey)
      props.navigation.navigate('Drawer');
    } catch (error) {
      console.error("Erro durante a criacao de pesquisa:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title={'Modificar pesquisa'} ></Navbar>
      <View style={styles.main}>
        <View style={styles.forms}>
          <InputTexto title={'Nome'} size={350} borderRadius={8} onChangeText={handleNameChange}/>
          <InputTexto title={'Data'} size={350} borderRadius={8} onChangeText={handleDataChange}/>
          <Text style={styles.texto}>Imagem</Text> 
          <TouchableOpacity onPress={tirarFoto}>
            <Image source={srcImg ? { uri: srcImg } : null} style={styles.imagem} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.botao}>
          <View style={styles.botao2}>
              <ButtonGeral title={'SALVAR'} color={'#37BD6D'} width={285} height={45} onPress={updateSurvey}/>
              <TouchableOpacity style={styles.botao3} onPress={setOpenModal} >
              <View >
                <Icon name="delete" size={50} color="#FFFFFF" /> 
                  <Text style={styles.apagarText}>Apagar</Text>
                </View>
            </TouchableOpacity>
            </View>
          </View>
        <Modal surveyid={id} isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}/>
    </View>
    
  );
}
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonGeral  from '../../components/ButtonGeral';
import InputTexto from '../../components/InputTexto';
import styles from './styles';
import { Navbar } from '../../components/Navbar';
import { sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../../shared/firebase/config';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')

  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (text) => {
    setEmail(text);
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    setEmailError(regex.test(text) ? "" : "E-mail parece ser inválido")
  }

  const recSenha = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("E-mail enviado com sucesso")
    })
    .catch((error) => {
      console.log("Falha ao enviar e-mail de recueração. Erro: " + JSON.stringfy(error))
    })
  }

  return (
    <View style={styles.container}>
      <Navbar title={'Recuperar senha'} ></Navbar>
      <InputTexto onChangeText={handleEmailChange} placeholder={'Digite seu email'} title={'E-mail'} size={300} error={emailError} borderRadius={8}/>
  
      <ButtonGeral title={'Recuperar'} color={'#37BD6D'} width={300} onPress={recSenha} disabled={Boolean(emailError)}/>
      
    </View>
  );
}

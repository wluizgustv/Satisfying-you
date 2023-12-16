import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ButtonGeral from '../../components/ButtonGeral';
import InputTexto from '../../components/InputTexto';
import { Logo } from '../../components/Logo';
import styles from './styles';
import { AuthLogin } from '../../services/authService';
import { reducerSetLogin } from '../../redux/loginSlice'; 
import { useAuth } from '../../context/authcontext';

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const {user, updateUser, isAuthenticated} = useAuth();

  const dispatch = useDispatch()

  useEffect(() => {
    var auth = isAuthenticated();

    console.log(auth);

    if (auth != null) {
      props.navigation.navigate('Drawer')
    }
  }, [user]);

  const goToCriarConta = () => {
    props.navigation.navigate('NovaConta')
  }

  const goToRecuperarSenha = () => {
    props.navigation.navigate('RecuperarSenha')
  }

  const login = async () => {
    await AuthLogin(email, password)
        .then(userCredential => {
          const userInfo = userCredential.user;

          updateUser(userInfo);

          dispatch(reducerSetLogin({ email: email, password: password }))

          props.navigation.navigate('Drawer')
        })
        .catch(error => {
          const errorCode = error.code;

          if (errorCode == 'auth/invalid-login-credentials') {
            setEmailError(regex.test(text) ? "" : "Email/senha inválidos")
          }
        });
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    setEmailError(regex.test(text) ? "" : "Email/senha inválidos")
  }

  const handlePasswordChange = (text) => {
    setPassword(text); 
  }

  return (
    <View style={styles.container}>
      <Logo/>
      <InputTexto placeholder={'Digite seu email'} title={'E-mail'} size={300} onChangeText={handleEmailChange} error={emailError}/>
      <InputTexto secure={true} placeholder={'Digite sua senha'} title={'Senha'} onChangeText={handlePasswordChange} size={300}/>

      <ButtonGeral title={'Entrar'} color={'#37BD6D'} width={300} disabled={Boolean(emailError) || email == '' || password == ''} onPress={login}/>
  
      <View style={styles.bottomContainer}>
        <ButtonGeral title={'Criar minha conta'} color={'#419ED7'} width={300} onPress={goToCriarConta}/>
        <ButtonGeral title={'Esqueci minha senha'} color={'#B0CCDE'} width={300} onPress={goToRecuperarSenha}/>
      </View>
      
    </View>
  );
}

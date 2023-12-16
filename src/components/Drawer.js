import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AuthSignOut } from '../services/authService';


const Drawer = (props) => {
  const email = useSelector((state) => state.login.email)

  const logOut = () => {
    AuthSignOut()
    props.navigation.popToTop()
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem    
         labelStyle={{color: 'white' }}
         label={`${email}`}/>
      <Divider />
      <DrawerItemList
       {...props} />
      <DrawerItem
      labelStyle={{color: 'white' }}
      label="Sair" onPress={() => { logOut() }} 
     />
    </DrawerContentScrollView>
  );
}


export default Drawer;
import {createContext, useState, useContext} from 'react';
import {auth} from '../shared/firebase/config';
import {AuthSignOut} from '../services/authService';

const AuthContext = createContext({});

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth tem que estar dentro de um AuthContext.Provider');
  }

  return context;
};

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});

  const updateUser = (user) => {
    setUser(user);
  };

  const isAuthenticated = () => {
    let user = auth.currentUser;

    if (user != null) {
      updateUser(user);
    }

    return user;
  };

  const signOutAuth = async () => {
    setUser({});
    await AuthSignOut();
  };

  return (
    <AuthContext.Provider value={{user, updateUser, isAuthenticated, signOutAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
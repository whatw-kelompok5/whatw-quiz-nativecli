import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AUTH_LOGIN, AUTH_LOGOUT} from '../store/RootReducer';
import {API} from '../libs/api';
import {RegisterType} from '../types/User';
import {useQuery} from '@tanstack/react-query';

GoogleSignin.configure({
  webClientId:
    '994994580988-7clgufo1tlbqdgbr69paqiiicog1pir9.apps.googleusercontent.com',
});

export function useAuth({navigation}: any) {
  const dispatch = useDispatch();
  const [id, setId] = useState<string | null>(null);
  const [emailUser, setEmailUser] = useState<RegisterType>({
    email: '',
    fullname: '',
    avatar: {
      id: 0,
      image: '',
    },
  });
  const [userInfoJSON, setUserInfoJSON] = useState<any>({
    email: '',
  });

  const {data: Users} = useQuery<RegisterType>({
    queryKey: ['user'],
    queryFn: async () => await API.get('/users').then(res => res.data.data),
  });

  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === emailUser.email)
    : [];

  let userFullname: any = '';
  let userAvatar: any = '';

  userLogin.map((e: any) => {
    userFullname = e.fullname;
    userAvatar = e.avatar;
  });
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const userInfo = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
      );
      const fetchedUserInfo = await userInfo.json();

      setId(idToken);
      setEmailUser({
        email: fetchedUserInfo.email,
        fullname: '',
        avatar: {
          id: 0,
          image: '',
        },
      });
      setUserInfoJSON(fetchedUserInfo.email);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      login();
    } catch (error) {
      console.log(error);
    }
  }

  async function login() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const userInfo = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
      );
      const fetchedUserInfo = await userInfo.json();
      dispatch(
        AUTH_LOGIN({
          email: fetchedUserInfo.email,
          fullname: '',
          avatar: {
            id: 0,
            image: '',
          },
        }),
      );
      const response = await API.post('/login', {
        email: fetchedUserInfo.email,
      });
      const userData = response.data.user;
      if (userData) {
        dispatch(
          AUTH_LOGIN({
            email: fetchedUserInfo.email,
            fullname: userData.fullname,
            avatar: userData.avatar,
          }),
        );
        navigation.navigate('StartGame');
      } else {
        console.log('Data pengguna tidak ditemukan.');
      }
      console.log('Login success', response.data);
    } catch (error) {
      console.log('Login error', error);
    }
  }

  async function handleLogin() {
    if (emailUser.fullname === '') {
      await onGoogleButtonPress();
      navigation.navigate('Profile');
    } else {
      await login();
    }
  }
  const logout = async () => {
    try {
      dispatch(AUTH_LOGOUT());
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setId(null);
      console.log('User signed out!');
    } catch (error) {
      console.log(error);
    }
  };

  return {onGoogleButtonPress, logout, Users, handleLogin, login};
}

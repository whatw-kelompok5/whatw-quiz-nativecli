/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AUTH_LOGIN} from '../store/RootReducer';
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
  const [emailUser, setEmailUser] = useState({
    email: '',
    fullname: '',
    avatar: null,
  });
  const [userInfoJSON, setUserInfoJSON] = useState<any>({
    email: '',
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
        fullname: fetchedUserInfo.name,
        avatar: null,
      });
      setUserInfoJSON(fetchedUserInfo.email);

      dispatch(
        AUTH_LOGIN({
          email: fetchedUserInfo.email,
          fullname: fetchedUserInfo.name,
          avatar: null,
        }),
      );

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      navigateToProfile(navigation);
    } catch (error) {
      console.log(error);
    }
  }

  const {data: Users} = useQuery<RegisterType>({
    queryKey: ['user'],
    queryFn: async () => await API.get('/users').then(res => res.data.data),
  });

  const navigateToProfile = async (navigation: any) => {
    if (userLogin.length > 0) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('StartGame');
    }
  };

  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === emailUser.email)
    : [];

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return {onGoogleButtonPress, logout, Users};
}

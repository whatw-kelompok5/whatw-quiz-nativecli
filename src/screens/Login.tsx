/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Image, Text, Button, ButtonText} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import logo from '../assets/logo.png';
import googleIcon from '../assets/google.png';
import WaterWave from '../components/WaterWave';
import {ImageBackground} from 'react-native';
import ReversedWaterWave from '../components/ReversedWaterWave';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Top from '../components/Top';
import {useDispatch} from 'react-redux';
import {AUTH_LOGIN} from '../store/RootReducer';
import {API} from '../libs/api';
import {RegisterType} from '../types/User';
import {useQuery} from '@tanstack/react-query';

GoogleSignin.configure({
  webClientId:
    '994994580988-7clgufo1tlbqdgbr69paqiiicog1pir9.apps.googleusercontent.com',
});

export default function Login({navigation}: any) {
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

  const {data: Users, isPending} = useQuery<RegisterType>({
    queryKey: ['user'],
    queryFn: async () => await API.get('/users').then(res => res.data.data),
  });

  const userEmail = Array.isArray(Users)
    ? Users.map((user: RegisterType) => user.email)
    : [];

  const emailTrue = userEmail?.includes(userInfoJSON);
  const navigateToProfile = (navigation: any) => {
    if (emailTrue) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('StartGame');
    }
  };
  console.log('email true', emailTrue);

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setId(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <ReversedWaterWave />
        <WaterWave />
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor="transparent"
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={60}
          paddingHorizontal={30}>
          <Top />
          <View>
            <Image source={logo} alt="logo" width={400} height={400} />
          </View>
          <View>
            <View>
              <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {
                  onGoogleButtonPress();
                }}>
                <View display="flex" flexDirection="row" gap={4}>
                  <Image
                    source={googleIcon}
                    alt="Google Icon"
                    width={20}
                    height={20}
                  />
                  <ButtonText>
                    <Text color="white" fontSize={16} fontWeight="bold">
                      Register with Google
                    </Text>
                  </ButtonText>
                </View>
              </Button>
              <Button
                size="md"
                marginTop="$2"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => logout()}>
                <View display="flex" flexDirection="row" gap={4}>
                  <Image
                    source={googleIcon}
                    alt="Google Icon"
                    width={20}
                    height={20}
                  />
                  <ButtonText>
                    <Text color="white" fontSize={16} fontWeight="bold">
                      Logout
                    </Text>
                  </ButtonText>
                </View>
              </Button>
            </View>
            <Text color="white" fontSize={10}>
              By continuing, you agree to the terms and privacy
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

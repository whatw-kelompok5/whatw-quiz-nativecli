/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Text,
  Button,
  ButtonText,
  ButtonIcon,
  ArrowLeftIcon,
  SettingsIcon,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import logo from '../assets/logo.png';
import googleIcon from '../assets/google.png';
import WaterWave from '../components/WaterWave';
import {ImageBackground} from 'react-native';
import ReversedWaterWave from '../components/ReversedWaterWave';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '994994580988-7clgufo1tlbqdgbr69paqiiicog1pir9.apps.googleusercontent.com',
});

export default function Login({navigation}: any) {
  const [id, setId] = useState<string | null>(null);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    const userInfo = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
    );
    const userInfoJSON = await userInfo.json();
    setId(idToken);
    console.log(userInfoJSON);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
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
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              rounded="$full"
              width={10}>
              <ButtonIcon as={ArrowLeftIcon} />
            </Button>
            <Text color="white" fontSize={20} fontWeight="bold">
              WHATW
            </Text>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              rounded="$full"
              width={10}>
              <ButtonIcon as={SettingsIcon} />
            </Button>
          </View>
          <View>
            <Image source={logo} alt="logo" width={400} height={400} />
          </View>
          <View>
            <View>
              {id === null ? (
                <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    onGoogleButtonPress().then(() => {
                      navigateToProfile();
                    });
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
                        Continue with Google
                      </Text>
                    </ButtonText>
                  </View>
                </Button>
              ) : (
                <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={logout}>
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
              )}
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

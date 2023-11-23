/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ButtonText,
  Input,
  InputIcon,
} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '.././store/type/RootState';
import ListFreeAvatar from '../components/ListFreeAvatar';
import {API} from '../libs/api';
import {useDispatch} from 'react-redux';
import {UPDATE_AVATAR_AND_FULLNAME} from '../store/slice/AuthSlice';
import ReversedWaterWave from '../feature/background/ReversedWaterWave';
import WaterWave from '../feature/background/WaterWave';
import {useAuth} from '../hooks/useAuth';
import StartGameComponent from './StartGame';
import {InputSlot} from '@gluestack-ui/themed';
import {AtSignIcon} from '@gluestack-ui/themed';
import {InputField} from '@gluestack-ui/themed';

export default function Profile({navigation}: any) {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);
  const {Users, login, logout} = useAuth({navigation});
  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === auth.email)
    : [];
  const dataUserLogin = userLogin[0];
  const [fullname, setFullname] = useState<string>('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<any>(null);

  const handleChange = (value: string) => {
    setFullname(value);
  };

  const handleAvatarClick = (avatarId: any) => {
    setSelectedAvatarId(avatarId);
  };

  async function handleRegister() {
    try {
      const dataToSend = {
        ...auth,
        avatar: selectedAvatarId,
        fullname: fullname,
      };

      dispatch(UPDATE_AVATAR_AND_FULLNAME(dataToSend));

      const response = await API.post('/register', dataToSend);
      console.log('Register success', response.data);
      login();
      navigation.navigate('StartGame');
    } catch (error) {
      console.log('Register error', error);
      logout()
      navigation.navigate('Login');
    }
  }

  if (dataUserLogin !== undefined) {
    return <StartGameComponent navigation={navigation} />;
  }

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
          <View width={'100%'} height={'70%'}>
            <View
              backgroundColor="white"
              width={'100%'}
              height={'60%'}
              overflow="scroll"
              borderRadius="$2xl"
              padding="$4"
              alignItems="center"
              marginBottom="$2">
              <View marginBottom={'$4'}>
                <Text>Choose your avatar</Text>
              </View>
              <ListFreeAvatar
                handleAvatarClick={handleAvatarClick}
                selectedAvatarId={selectedAvatarId}
              />
            </View>
            <View
              width={'100%'}
              height={'10%'}
              borderRadius="$2xl"
              paddingHorizontal="$4"
              paddingTop={'$1'}
              alignItems="center">
              <Input backgroundColor="white" width={'110%'} borderRadius="$xl">
                <InputSlot pl="$3">
                  <InputIcon as={AtSignIcon} />
                </InputSlot>
                <InputField
                  placeholder="Search..."
                  value={fullname}
                  onChangeText={handleChange}
                />
              </Input>
            </View>
          </View>
          <View width={'100%'} height={'15%'}>
            <Button
              size="md"
              backgroundColor="$amber600"
              variant="solid"
              $active-bgColor="$amber700"
              height="50%"
              borderRadius="$2xl"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                handleRegister();
                navigation.navigate('StartGame');
              }}>
              <ButtonText>Continue </ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

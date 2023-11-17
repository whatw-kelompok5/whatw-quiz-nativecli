/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ButtonIcon,
  ButtonText,
  ArrowLeftIcon,
  Input,
  SettingsIcon,
} from '@gluestack-ui/themed';
import WaterWave from '../components/WaterWave';
import {ImageBackground, TextInput} from 'react-native';
import ReversedWaterWave from '../components/ReversedWaterWave';
import {useSelector} from 'react-redux';
import {RootState} from '.././store/type/RootState';
import ListFreeAvatar from '../components/ListFreeAvatar';
import {API} from '../libs/api';
import {useDispatch} from 'react-redux';
import {UPDATE_AVATAR_AND_FULLNAME} from '../store/slice/AuthSlice';
interface ProfileProps {
  navigation: any;
}

interface AuthData {}

export default function Profile({navigation}: ProfileProps) {
  const dispatch = useDispatch();

  const auth: AuthData = useSelector((state: RootState) => state.auth);
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
      console.log('Success', response.data);
    } catch (error) {
      console.log(error);
    }
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
              width={10}
              onPress={() => navigation.goBack()}>
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
              <Input
                backgroundColor="white"
                width={'110%'}
                size="md"
                borderRadius="$xl"
                borderWidth={0}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
                <TextInput
                  placeholder="Your username.."
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

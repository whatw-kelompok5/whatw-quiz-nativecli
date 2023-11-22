/* eslint-disable react-native/no-inline-styles */
import {Button, View, Text, Image} from '@gluestack-ui/themed';
import React from 'react';
import Diamond from '../components/Diamond';
import ChangeAvatar from '../components/ChangeAvatar';
import {ButtonText} from '@gluestack-ui/themed';
import logo from '../assets/logo.png';
import {ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {useAuth} from '../hooks/useAuth';
import {RootState} from '../store/type/RootState';
import ReversedWaterWave from '../feature/background/ReversedWaterWave';
import WaterWave from '../feature/background/WaterWave';
import Setting from '../feature/top/Setting';
export default function StartGameComponent({navigation}: any) {
  const auth = useSelector((state: RootState) => state.auth);
  const {Users, logout} = useAuth({navigation});
  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === auth.email)
    : [];
  const dataUserLogin = userLogin[0];
  console.log(dataUserLogin);
  // if (!dataUserLogin) {
  //   logout();
  //   navigation.navigate('Login');
  // }
  return dataUserLogin ? (
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
          paddingTop={30}>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingHorizontal={30}>
            <Setting navigation={navigation} />
            <View />
            <View position="absolute" right={10}>
              <View
                backgroundColor="white"
                height={42}
                borderRadius={100}
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="row"
                gap={10}>
                <Diamond />
              </View>
            </View>
          </View>
          <View
            backgroundColor="white"
            width={'100%'}
            height={'75%'}
            borderTopLeftRadius="$2xl"
            borderTopRightRadius="$2xl"
            alignItems="center">
            <Image
              borderWidth={10}
              width={200}
              height={200}
              borderRadius={100}
              borderColor="white"
              source={dataUserLogin.avatar.image}
              alt="avatar"
              marginTop={-100}
              backgroundColor="red"
              justifyContent="center"
              alignItems="center"
              position="relative"
            />
            <View position="absolute" top={-85} right={80} zIndex={999}>
              <ChangeAvatar />
            </View>
            <View marginTop={20}>
              <Text fontWeight="bold" fontSize={20}>
                {dataUserLogin.fullname}
              </Text>
            </View>
            <View position="absolute" margin={50}>
              <Image source={logo} alt="logo" width={400} height={400} />
            </View>
            <View width={'80%'} height={'20%'}>
              <Button
                size="md"
                backgroundColor="$amber600"
                variant="solid"
                $active-bgColor="$amber700"
                height="50%"
                borderRadius="$2xl"
                isDisabled={false}
                isFocusVisible={false}
                top={300}
                onPress={() => navigation.navigate('Matching')}>
                <ButtonText>Start</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  ) : null;
}

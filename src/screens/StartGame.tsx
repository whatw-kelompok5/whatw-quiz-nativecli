/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  View,
  Text,
  Image,
  Spinner,
  ScrollView,
} from '@gluestack-ui/themed';
import React, {useState, useEffect} from 'react';
import Diamond from '../components/Diamond';
import ChangeAvatar from '../components/ChangeAvatar';
import {ButtonText} from '@gluestack-ui/themed';
import logo from '../assets/logo.png';
import {Alert, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {useAuth} from '../hooks/useAuth';
import {RootState} from '../store/type/RootState';
import ReversedWaterWave from '../feature/background/ReversedWaterWave';
import WaterWave from '../feature/background/WaterWave';
import Setting from '../feature/top/Setting';
import LottieView from 'lottie-react-native';
import {Loading} from '../feature/loading/Loading';
export default function StartGameComponent({navigation}: any) {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {}, [auth?.avatar?.image]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading && !auth) {
      Alert.alert('Error connection', 'Please login again');
      navigation.navigate('Login');
    }
  }, [isLoading, navigation]);

  return isLoading ? (
    <Loading />
  ) : (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
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
            zIndex={-999}
            width={'100%'}
            height={400}
            marginTop={-250}
            borderBottomLeftRadius="$full"
            borderBottomRightRadius="$full"
            alignItems="center">
            <Image
              borderWidth={10}
              width={200}
              height={200}
              borderRadius={100}
              borderColor="white"
              source={auth?.avatar?.image}
              alt="avatar"
              top={100}
              backgroundColor="red"
              justifyContent="center"
              alignItems="center"
              position="relative"
            />
            <View position="absolute" top={120} right={90} zIndex={999}>
              <ChangeAvatar />
            </View>
            <View top={120}>
              <Text fontWeight="bold" fontSize={20} color="black">
                {auth.fullname}
              </Text>
            </View>
          </View>
          <View width={'80%'} height={'20%'}>
            <Button
              size="md"
              backgroundColor="#12486B"
              display="flex"
              justifyContent="space-between"
              variant="solid"
              $active-bgColor="$amber700"
              height="50%"
              borderRadius="$3xl"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => navigation.navigate('Matching')}>
              <LottieView
                source={require('../assets/lottie/Animation - Global.json')}
                autoPlay
                loop
                style={{width: 30, height: 30}}
              />
              <ButtonText color="white">Play</ButtonText>
              <LottieView
                source={require('../assets/lottie/Animation - Global.json')}
                autoPlay
                loop
                style={{width: 30, height: 30}}
              />
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

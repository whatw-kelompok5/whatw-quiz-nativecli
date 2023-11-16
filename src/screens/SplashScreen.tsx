/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import logo from '../assets/logo.png';
import SplashScreen from 'react-native-splash-screen';
import ReversedWaterWave from '../components/ReversedWaterWave';
import WaterWave from '../components/WaterWave';

export default function SplashScreenComponent({navigation}: any) {
  setTimeout(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
    navigation.navigate('Login');
  }, 3000);
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
          position="absolute"
          top={200}
          alignItems="center"
          paddingVertical={60}
          paddingHorizontal={30}>
          <View>
            <Image source={logo} alt="logo" width={400} height={400} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

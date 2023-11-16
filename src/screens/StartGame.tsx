/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  View,
  ButtonIcon,
  Text,
  ArrowLeftIcon,
  Image,
} from '@gluestack-ui/themed';
import React from 'react';
import WaterWave from '../components/WaterWave';
import Diamond from '../components/Diamond';
import ChangeAvatar from '../components/ChangeAvatar';
import {ButtonText} from '@gluestack-ui/themed';
import logo from '../assets/logo.png';
import {ImageBackground} from 'react-native';
import ReversedWaterWave from '../components/ReversedWaterWave';

export default function StartGameComponent({navigation}: any) {
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
          paddingTop={60}>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingHorizontal={30}>
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
            height={600}
            borderTopLeftRadius="$2xl"
            borderTopRightRadius="$2xl"
            alignItems="center">
            <View
              borderWidth={10}
              width={200}
              height={200}
              borderRadius={100}
              borderColor="#12486B"
              marginTop={-100}
              backgroundColor="white"
              justifyContent="center"
              alignItems="center"
              position="relative"
            />
            <View position="absolute" top={-100} right={100}>
              <ChangeAvatar />
            </View>
            <View marginTop={20}>
              <Text fontWeight="bold" fontSize={20}>
                Jhon Doe
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
  );
}

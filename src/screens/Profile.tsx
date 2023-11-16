/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Button,
  ButtonIcon,
  ButtonText,
  ArrowLeftIcon,
  AvatarFallbackText,
  Avatar,
  Input,
  InputField,
  SettingsIcon,
} from '@gluestack-ui/themed';
import React from 'react';
import WaterWave from '../components/WaterWave';
import {ImageBackground} from 'react-native';
import ReversedWaterWave from '../components/ReversedWaterWave';

export default function Profile({navigation}: any) {
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
              borderRadius="$2xl"
              padding="$4"
              alignItems="center"
              marginBottom="$2">
              <View marginBottom="$10">
                <Text>Choose your avatar</Text>
              </View>
              <View
                flexDirection="row"
                flexWrap="wrap"
                width={'100%'}
                justifyContent="space-between"
                gap={10}>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
                <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                  <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
                </Avatar>
              </View>
            </View>
            <View
              backgroundColor="white"
              width={'100%'}
              height={'10%'}
              borderRadius="$2xl"
              paddingHorizontal="$4"
              paddingTop={'$1'}
              alignItems="center">
              <Input
                size="md"
                borderWidth={0}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
                <InputField placeholder="Your username.." />
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
              onPress={() => navigation.navigate('StartGame')}>
              <ButtonText>Continue </ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

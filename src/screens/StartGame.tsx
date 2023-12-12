import {Button, View, Text, Image} from '@gluestack-ui/themed';
import React, {useState, useEffect} from 'react';
import Diamond from '../components/Diamond';
import ChangeAvatar from '../components/ChangeAvatar';
import {ButtonText} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/type/RootState';
import Setting from '../feature/top/Setting';
import LottieView from 'lottie-react-native';
import {Loading} from '../feature/loading/Loading';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_LOGIN} from '../store/RootReducer';
import {API} from '../libs/api';
import {UPDATE_AVATAR, UPDATE_DIAMOND} from '../store/slice/AuthSlice';
import {useAuth} from '../hooks/useAuth';

export default function StartGameComponent({navigation}: any) {
  const [isLoading, setIsLoading] = useState(true);
  const {Users} = useAuth({navigation});
  const [diamondUser, setDiamondUser] = useState(null);
  const [userData, setUserData] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const userDataFromStorage = await AsyncStorage.getItem('userData');
        if (userDataFromStorage) {
          const userDataParsed = JSON.parse(userDataFromStorage);
          setUserData(userDataParsed);
          dispatch(
            AUTH_LOGIN({
              token: userDataParsed.token,
              avatar: userDataParsed.avatar,
              fullname: userDataParsed.fullname,
              email: userDataParsed.email,
              diamond: userDataParsed.diamond,
            }),
          );
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    }

    fetchData();
  }, []);

  const auth: any = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function setAsyncStorage() {
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          token: auth.token,
          email: auth.email,
          fullname: auth.fullname,
          avatar: auth.avatar,
          diamond: auth.diamond,
        }),
      );
    }
    setAsyncStorage();
  }, [auth]);

  useEffect(() => {
    if (!auth && !userData) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [userData, auth]);

  const [selectedAvatar, setSelectedAvatar] = useState<any>({
    id: 0,
    price: 0,
  });

  const handleAvatarClick = (avatar: any) => {
    setSelectedAvatar({
      id: avatar.id,
      price: avatar.price,
    });
  };

  async function handleUpdateAvatar() {
    try {
      const dataToSend = {
        avatar: selectedAvatar.id,
      };
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };

      const response = await API.patch('/user', dataToSend, {headers});
      console.log('Success change avatar');
      dispatch(
        UPDATE_AVATAR({
          avatar: response.data.data.avatar,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBuyAvatar() {
    try {
      const dataToSend = {
        avatarId: selectedAvatar.id,
      };
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };
      const response = await API.post('/user/buyavatar', dataToSend, {headers});
      console.log('Success buy avatar');
      await handleUpdateAvatar();
      dispatch(
        UPDATE_DIAMOND({
          diamond: auth.diamond - selectedAvatar.price,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }



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
                <Diamond
                  userDiamonds={auth.diamond}
                />
              </View>
            </View>
          </View>
          <View
            backgroundColor="transparent"
            zIndex={-999}
            width={'100%'}
            height={450}
            position="absolute"
            borderBottomLeftRadius="$3xl"
            borderBottomRightRadius="$3xl"
            alignItems="center">
            <View position="absolute" top={125}>
              <LottieView
                source={require('../assets/lottie/Animation - 1701092146998.json')}
                autoPlay
                loop
                style={{width: 300, height: 300}}
              />
            </View>
            <Image
              borderWidth={10}
              width={150}
              height={150}
              borderRadius={100}
              borderColor="white"
              source={auth?.avatar?.image}
              alt="avatar"
              top={200}
              backgroundColor="white"
              justifyContent="center"
              alignItems="center"
              position="relative"
            />
            <View
              position="absolute"
              marginTop={'47%'}
              width={'100%'}
              left={50}
              zIndex={999}>
              <ChangeAvatar
                handleAvatarClick={handleAvatarClick}
                selectedAvatarId={selectedAvatar}
                selectedAvatar={selectedAvatar}
                handleUpdateAvatar={handleUpdateAvatar}
                handleBuyAvatar={handleBuyAvatar}
              />
            </View>
            <View top={250} alignItems="center" width={'100%'}>
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize={12}
                color="gray"
                marginBottom={4}>
                Hello👋
              </Text>
              <Text
                fontWeight="bold"
                fontSize={20}
                color="white"
                textAlign="center">
                {auth.fullname}
              </Text>
            </View>
          </View>
          <View width={'80%'} height={'20%'}>
            <Button
              size="md"
              borderWidth={1}
              display="flex"
              justifyContent="space-between"
              variant="solid"
              height="50%"
              backgroundColor="transparent"
              borderColor="white"
              $active-borderColor="#12486B"
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

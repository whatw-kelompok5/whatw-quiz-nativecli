import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import socketIOClient from 'socket.io-client';
import { RootState } from '../store/type/RootState';
import { useSelector } from 'react-redux';

const CountdownScreen = ({navigation}: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [countdown, setCountdown] = useState(0);
  const [playerCount, setPlayerCount] = useState(0); // State untuk menyimpan jumlah pemain

  useEffect(() => {
    const socket = socketIOClient('http://192.168.18.107:5000');

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      socket.emit('userData', {
        avatar: auth.avatar?.image,
        fullname: auth.fullname,
        email: auth.email,
      });
    });

    socket.on('countdown', data => {
      setCountdown(data);
    });

    socket.on('playerJoined', count => {
      setPlayerCount(count); // Menerima jumlah pemain yang bergabung
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (playerCount === 2) {
        navigation.navigate('SplashScreen');
      }
    }, 2000);
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24}}>Countdown: {countdown}</Text>
      <Text style={{fontSize: 20}}>Players Joined: {playerCount}</Text>
      <Text> </Text>
    </View>
  );
};

export default CountdownScreen;

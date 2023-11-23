import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import {Image} from '@gluestack-ui/themed';
import CountDown from 'react-native-countdown-component';
import BackgroundLogo from '../assets/background.png';
// import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/type/RootState';
import {useAuth} from '../hooks/useAuth';
interface UserData {
  avatar: string;
  fullname: string;
}
const Matching = ({navigation}: any) => {
  const totalMatchingItems = 5;
  const initialCountdownTime = 60;
  const [countdownTime, setCountdownTime] = useState(initialCountdownTime);
  const [matchingData, setMatchingData] = useState<UserData[]>([]);
  const auth = useSelector((state: RootState) => state.auth);
  const {Users}: any = useAuth({navigation});

  // useEffect(() => {
  //   const socket = io('http://192.168.18.157:5000');

  //   socket.on('connect', () => {
  //     console.log('Socket.IO connected');
  //     socket.emit('userData', {  avatar: auth.avatar, fullname: auth.fullname });
  //   });

  //   socket.on('userData', (userData) => {
  //     console.log('Received user data:', userData);

  //     setMatchingData((prevData) => (prevData.length < totalMatchingItems ? [...prevData, userData] : prevData));
  //   });

  //   socket.on('usersData', (usersData) => {
  //     console.log('Received users data:', usersData);
  //     setMatchingData(usersData.slice(0, totalMatchingItems));
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Socket.IO disconnected');
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [auth]);

  useEffect(() => {
    if (Users.length >= totalMatchingItems) {
      setTimeout(() => {
        navigation.navigate('Task');
      }, 5000);
    } else {
      setCountdownTime(initialCountdownTime);
    }
  }, [matchingData, navigation]);

  const handleCountdownFinish = () => {
    if (matchingData.length < totalMatchingItems) {
      setCountdownTime(initialCountdownTime);
    }
  };

  const progressText = `${Users.length}/${totalMatchingItems}`;

  // ... (kode sebelumnya)

  return (
    <ImageBackground
      source={BackgroundLogo as ImageSourcePropType}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Matching Up!!</Text>

        <CountDown
          size={50}
          until={countdownTime}
          onFinish={handleCountdownFinish}
          digitStyle={{backgroundColor: 'transparent'}}
          digitTxtStyle={{color: '#FFA33C'}}
          separatorStyle={{color: '#FFA33C', fontWeight: 'bold'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: null || undefined, s: null || undefined}}
          showSeparator
        />

        <Text style={styles.progress}>{progressText}</Text>

        <View style={styles.cardRow}>
          {/* Baris Pertama */}
          <FlatList
            data={Users.slice(0, Math.min(2, Users.length))}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Image source={auth.avatar?.image} style={styles.avatar} />
                <Text style={styles.name}>{auth.fullname}</Text>
              </View>
            )}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={styles.middleRow}>
          {/* Baris Kedua */}
          <View style={styles.card}>
            <Image source={auth.avatar?.image} style={styles.avatar} />
            <Text style={styles.name}>{auth.fullname}</Text>
          </View>
        </View>

        <View style={styles.cardRow}>
          {/* Baris Ketiga */}
          <FlatList
            data={Users.slice(2, Math.min(4, Users.length))}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Image source={auth.avatar?.image} style={styles.avatar} />
                <Text style={styles.name}>{auth.fullname}</Text>
              </View>
            )}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: -20,
  },
  progress: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -20,
    marginBottom: 20,
  },
  listContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  middleRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    width: 150,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Matching;

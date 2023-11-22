/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  ImageSourcePropType,
} from 'react-native';
import {CountDown} from 'react-native-countdown-component';
import BackgroundLogo from '../assets/background.png';

const data = [
  {id: '1', avatar: require('../assets/avatar.png'), name: 'John'},
  {id: '2', avatar: require('../assets/avatar.png'), name: 'Jane'},
  {id: '3', avatar: require('../assets/avatar.png'), name: 'Doe'},
  {id: '4', avatar: require('../assets/avatar.png'), name: 'Alice'},
  {id: '5', avatar: require('../assets/avatar.png'), name: 'Bob'},
];

const Matching = ({navigation}: any) => {
  // Bagi data menjadi dua baris (2 di atas, 1 tengah, 2 di bawah)
  const topData = data.slice(0, 2);
  const middleData = data.slice(2, 3);
  const bottomData = data.slice(3);

  return (
    <ImageBackground
      source={BackgroundLogo as ImageSourcePropType}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 50,
          paddingVertical: 70,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
          }}>
          Matching Up!!
        </Text>
        <CountDown
          size={50}
          until={60}
          onFinish={() => navigation.navigate('Task')}
          digitStyle={{backgroundColor: 'transparent'}}
          digitTxtStyle={{color: '#FFA33C'}}
          separatorStyle={{color: '#FFA33C', fontWeight: 'bold'}}
          timeToShow={['M', 'S']}
          timeLabels={{m: null, s: null}}
          showSeparator
        />
        <Text
          style={{
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            marginTop: -50,
            marginBottom: 30,
          }}>
          2/5
        </Text>

        {/* Baris Pertama */}
        <FlatList
          data={topData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
        />

        {/* Baris Tengah */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -100,
          }}>
          {middleData.map(item => (
            <View key={item.id} style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Baris Kedua */}
        <FlatList
          data={bottomData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 130,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Matching;

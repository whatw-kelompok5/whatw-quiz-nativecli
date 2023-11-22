import React, {useEffect, useState} from 'react';
import {View} from '@gluestack-ui/themed';
import {StyleSheet, Animated, Easing} from 'react-native';

export default function WaterWave() {
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 15000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        rotateValue.setValue(0);
        startAnimation();
      });
    };

    startAnimation();
  }, [rotateValue]);

  return (
    <View style={styles.container} width={'100%'} height={'100%'}>
      <Animated.View
        style={[
          styles.wave1,
          {
            transform: [
              {
                rotate: rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave2,
          {
            transform: [
              {
                rotate: rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave3,
          {
            transform: [
              {
                rotate: rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  wave1: {
    position: 'absolute',
    width: '300%',
    height: '300%',
    left: '-100%',
    top: '50%',
    backgroundColor: 'rgba(0,190,255,0.4)',
    borderRadius: 45,
  },
  wave2: {
    position: 'absolute',
    width: '300%',
    height: '300%',
    left: '-100%',
    top: '57%',
    backgroundColor: 'rgba(0,70,110,0.4)',
    borderRadius: 43,
  },
  wave3: {
    position: 'absolute',
    width: '300%',
    height: '300%',
    left: '-100%',
    top: '60%',
    backgroundColor: 'rgba(0,90,110,0.4)',
    borderRadius: 40,
  },
});

import React, {useEffect, useState} from 'react';
import {View} from '@gluestack-ui/themed';
import {useAvatar} from '../../hooks/useAvatar';

const LoadingAvatar = () => {
  const {AvatarsUser} = useAvatar();

  const [isGray, setIsGray] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGray((prevIsGray: any) => !prevIsGray);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View
      flexDirection="row"
      flexWrap="wrap"
      width={'100%'}
      alignItems="center"
      justifyContent="center">
      <View flexDirection="column" gap={10}>
        <View
          gap={14}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          width={60}
          height={85}>
          {Array.from({length: 3}).map((_, index) => (
            <View
              key={index}
              width={60}
              height={85}
              style={{
                backgroundColor: isGray ? '#DADADA' : '#B0B0B0',
                borderRadius: 10,
              }}
            />
          ))}
        </View>
        <View
          gap={14}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          width={60}
          height={85}>
          {Array.from({length: 3}).map((_, index) => (
            <View
              key={index}
              width={60}
              height={85}
              style={{
                backgroundColor: isGray ? '#DADADA' : '#B0B0B0',
                borderRadius: 10,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default LoadingAvatar;

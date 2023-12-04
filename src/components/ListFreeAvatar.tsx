import React, {useEffect, useState} from 'react';
import {View, Avatar, AvatarImage, Button} from '@gluestack-ui/themed';
import {useAvatar} from '../hooks/useAvatar';
import LoadingAvatar from '../feature/loading/LoadingAvatar';

const ListFreeAvatar = ({handleAvatarClick, selectedAvatarId}: any) => {
  const {Avatars} = useAvatar();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (Avatars) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  });

  const avatarsToRender = Array.isArray(Avatars)
    ? Avatars.filter(avatar => avatar.price === 0)
    : [];

  const rows = [];
  for (let i = 0; i < avatarsToRender.length; i += 3) {
    rows.push(avatarsToRender.slice(i, i + 3));
  }

  return isLoading ? (
    <LoadingAvatar />
  ) : (
    <View flexDirection="column">
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          flexDirection="row"
          justifyContent={row.length < 3 ? 'flex-start' : 'space-around'}
          gap={10}
          width={'100%'}>
          {row.map((avatar, index) => (
            <Button
              key={index}
              bgColor={
                selectedAvatarId === avatar.id ? '#12486B' : 'transparent'
              }
              width={60}
              height={85}
              $active={{bgColor: '#12486B'}}
              onPress={() => handleAvatarClick(avatar.id)}>
              <Avatar bgColor="transparent" size="md" borderRadius="$full">
                <AvatarImage source={{uri: avatar.image}} />
              </Avatar>
            </Button>
          ))}
          {row.length < 3 &&
            Array.from({length: 3 - row.length}).map((_, emptyIndex) => (
              <View key={emptyIndex} width={60} height={85} />
            ))}
        </View>
      ))}
    </View>
  );
};

export default ListFreeAvatar;

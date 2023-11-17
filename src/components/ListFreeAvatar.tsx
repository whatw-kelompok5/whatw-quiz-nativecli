import React from 'react';
import {View, Avatar, AvatarImage, Button} from '@gluestack-ui/themed';
import {useAvatar} from '../hooks/useAvatar';

const ListFreeAvatar = ({handleAvatarClick, selectedAvatarId}: any) => {
  const {Avatars} = useAvatar();

  return (
    <View
      flexDirection="row"
      flexWrap="wrap"
      width={'100%'}
      justifyContent="space-around"
      gap={10}>
      {Array.isArray(Avatars) &&
        Avatars?.filter(avatar => avatar.price === 0).map((avatar, index) => (
          <Button
            key={index}
            bgColor={selectedAvatarId === avatar.id ? 'gray' : 'transparent'}
            width={60}
            height={85}
            onPress={() => handleAvatarClick(avatar.id)}>
            <Avatar bgColor="transparent" size="md" borderRadius="$full">
              <AvatarImage source={{uri: avatar.image}} />
            </Avatar>
          </Button>
        ))}
    </View>
  );
};

export default ListFreeAvatar;

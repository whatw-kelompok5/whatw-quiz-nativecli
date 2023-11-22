import React from 'react';
import {View, Avatar, AvatarImage, Button, Text} from '@gluestack-ui/themed';
import {useAvatar} from '../hooks/useAvatar';

const ListAllAvatar = ({handleAvatarClick, selectedAvatarId}: any) => {
  const {Avatars} = useAvatar();

  return (
    <View
      flexDirection="row"
      flexWrap="wrap"
      width={'100%'}
      justifyContent="space-around"
      gap={10}>
      {Array.isArray(Avatars) &&
        Avatars?.map((avatar, index) => (
          <Button
            key={index}
            display="flex"
            flexDirection="column"
            bgColor={selectedAvatarId === avatar.id ? 'gray' : 'transparent'}
            width={60}
            height={85}
            onPress={() => handleAvatarClick(avatar.id)}>
            <Avatar bgColor="transparent" size="md" borderRadius="$full">
              <AvatarImage source={{uri: avatar.image}} />
            </Avatar>
            <Text fontSize="$xs" width="160%">
              ${avatar.price === 0 ? 'Free' : avatar.price}
            </Text>
          </Button>
        ))}
    </View>
  );
};

export default ListAllAvatar;

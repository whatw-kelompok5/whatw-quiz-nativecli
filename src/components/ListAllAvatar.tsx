import React, {useEffect, useState} from 'react';
import {View, Avatar, AvatarImage, Button, Text} from '@gluestack-ui/themed';
import {useAvatar} from '../hooks/useAvatar';
import LoadingAvatar from '../feature/loading/LoadingAvatar';
import {useSelector} from 'react-redux';
import {RootState} from '../store/type/RootState';

const ListAllAvatar = ({handleAvatarClick, selectedAvatar}: any) => {
  const auth = useSelector((state: RootState) => state.auth);

  const {AvatarsUser} = useAvatar();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (AvatarsUser) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  });

  const ownedAvatars = AvatarsUser?.filter(
    (avatar: {owned: boolean}) => avatar.owned === true,
  );

  const avatarRows = [];
  if (Array.isArray(ownedAvatars)) {
    for (let i = 0; i < ownedAvatars.length; i += 3) {
      avatarRows.push(ownedAvatars.slice(i, i + 3));
    }
  }

  useEffect(() => {}, [AvatarsUser, auth]);

  return isLoading ? (
    <LoadingAvatar />
  ) : (
    <View
      flexDirection="row"
      flexWrap="wrap"
      width={'100%'}
      alignItems="center"
      justifyContent="center">
      {avatarRows.map((row, rowIndex) => (
        <View key={rowIndex} flexDirection="row" gap={20}>
          {row.map((avatar, index) => (
            <Button
              key={index}
              marginBottom={10}
              display="flex"
              flexDirection="column"
              $active={{bgColor: '#12486B'}}
              bgColor={selectedAvatar.id === avatar.id ? '#12486B' : 'transparent'}
              width={60}
              height={85}
              style={{
                marginRight:
                  rowIndex === avatarRows.length - 1 &&
                  row.length < 3 &&
                  index === row.length - 1
                    ? 'auto'
                    : undefined,
              }}
              onPress={() => handleAvatarClick(avatar)}>
              <Avatar bgColor="transparent" size="md" borderRadius="$full">
                <AvatarImage source={{uri: avatar.image}} />
              </Avatar>
              <Text
                fontSize="$xs"
                width="200%"
                color={selectedAvatar.id === avatar.id ? 'white' : 'black'}
                $active={{color: 'white'}}>
                {avatar.owned === true ? 'owned' : avatar.price}
              </Text>
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ListAllAvatar;

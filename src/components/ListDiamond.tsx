import diamondImage from '../assets/diamond.png';
import React, {useEffect, useState} from 'react';
import {Button, View, Image, Text} from '@gluestack-ui/themed';
import {useDiamond} from '../hooks/useDiamond';
import LoadingAvatar from '../feature/loading/LoadingAvatar';

const ListDiamond = ({handleDiamondClick, selectedDiamondId}: any) => {
  const {Diamonds} = useDiamond();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (Diamonds) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  });

  const rows = [];
  for (let i = 0; i < Diamonds?.length; i += 3) {
    rows.push(Diamonds.slice(i, i + 3));
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
          {row.map(
            (
              diamond: {id: any; quantity: any; price: any},
              index: React.Key | null | undefined,
            ) => (
              <Button
                key={index}
                bgColor={
                  selectedDiamondId?.id === diamond.id
                    ? '#12486B'
                    : 'transparent'
                }
                width={60}
                height={85}
                display="flex"
                borderColor="gray"
                borderWidth={1}
                flexDirection="column"
                marginBottom={14}
                $active={{bgColor: '#12486B'}}
                onPress={() => handleDiamondClick(diamond.id)}>
                <Image
                  source={diamondImage}
                  alt="diamond"
                  width={30}
                  height={25}
                />
                <View display="flex" flexDirection="column" alignItems="center">
                  <Text fontSize={10}>{diamond.quantity}</Text>
                  <Text fontSize={10} width="200%">
                    {diamond.price}
                  </Text>
                </View>
              </Button>
            ),
          )}
          {row.length < 3 &&
            Array.from({length: 3 - row.length}).map((_, emptyIndex) => (
              <View key={emptyIndex} width={60} height={85} />
            ))}
        </View>
      ))}
    </View>
  );
};

export default ListDiamond;

import {
  View,
  Text,
  Button,
  ButtonIcon,
  ArrowLeftIcon,
  SettingsIcon,
} from '@gluestack-ui/themed';
import React from 'react';

const Top = () => {
  return (
    <View
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%">
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        rounded="$full"
        width={10}>
        <ButtonIcon as={ArrowLeftIcon} />
      </Button>
      <Text color="white" fontSize={20} fontWeight="bold">
        WHATW
      </Text>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        rounded="$full"
        width={10}>
        <ButtonIcon as={SettingsIcon} />
      </Button>
    </View>
  );
};

export default Top;

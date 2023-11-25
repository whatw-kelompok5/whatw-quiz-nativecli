import {
  Button,
  ButtonIcon,
  SettingsIcon,
  Center,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Icon,
  CloseIcon,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
const Setting = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);

  const {logout} = useAuth({navigation});
  const handleLogout = async () => {
    await logout();
    setShowModal(false);
    navigation.navigate('Login');
  };
  return (
    <Center>
      <Button
        size="md"
        backgroundColor="#12486B"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        rounded="$full"
        width={10}
        onPress={() => {
          setShowModal(true);
        }}
        ref={ref}>
        <ButtonIcon as={SettingsIcon} color="white" />
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Change your account</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to change account?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              backgroundColor="#12486B"
              onPress={handleLogout}>
              <ButtonText>Logout</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default Setting;

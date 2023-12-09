import {ButtonIcon} from '@gluestack-ui/themed';
import {EditIcon} from '@gluestack-ui/themed';
import {
  Center,
  Button,
  ButtonText,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBackdrop,
  View,
  Text,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import AccordionComponent from './Accordion';

export default function ChangeAvatar({
  handleAvatarClick,
  selectedAvatar,
  handleBuyAvatar,
  handleUpdateAvatar,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const [activeTab, setActiveTab] = useState('listAllAvatar');
  const toggleTab = (tab: any) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  useEffect(() => {
    setActiveTab('listAllAvatar');
  }, []);

  return (
    <Center h={300}>
      <Button
        onPress={() => setShowModal(true)}
        ref={ref}
        borderRadius="$full"
        width={0}
        h={43}
        p="$3.5"
        bg="white"
        borderColor="white"
        borderWidth={2}
        $active-borderColor="#12486B">
        <ButtonIcon as={EditIcon} color="#12486B" size="xs" />
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader />
          <ModalBody>
            <View
              backgroundColor="transparent"
              width={'100%'}
              height={'60%'}
              borderRadius="$2xl"
              padding="$4"
              alignItems="center"
              marginBottom="$2">
              <View marginBottom="$10">
                <Heading size="lg">Change your avatar</Heading>
              </View>
              <View height={400}>
                <AccordionComponent
                  handleAvatarClick={handleAvatarClick}
                  selectedAvatar={selectedAvatar}
                  activeTab={activeTab}
                  toggleTab={toggleTab}
                />
              </View>
            </View>
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

            {activeTab === 'listAllAvatar' ? (
              <Button
                size="sm"
                backgroundColor="#12486B"
                $active-bgColor="#001524"
                width={80}
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  setShowModal(false);
                  handleUpdateAvatar();
                }}>
                <ButtonText>Use</ButtonText>
              </Button>
            ) : (
              <Button
                size="sm"
                backgroundColor="#12486B"
                $active-bgColor="#001524"
                width={80}
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  setShowModal(false);
                  handleBuyAvatar();
                }}>
                <ButtonText>Buy</ButtonText>
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

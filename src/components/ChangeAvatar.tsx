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
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import ListAllAvatar from './ListAllAvatar';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_AVATAR_AND_FULLNAME} from '../store/slice/AuthSlice';
import {API} from '../libs/api';
import {RootState} from '../store/type/RootState';
import {useAuth} from '../hooks/useAuth';

export default function ChangeAvatar({navigation}: any) {
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {Users} = useAuth({navigation});
  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === auth.email)
    : [];
  const dataUserLogin = userLogin[0];

  const [selectedAvatarId, setSelectedAvatarId] = useState<any>(null);
  const handleAvatarClick = (avatarId: any) => {
    setSelectedAvatarId(avatarId);
  };
  async function handleUpdateAvatar() {
    try {
      const dataToSend = {
        avatar: selectedAvatarId,
        fullname: dataUserLogin.fullname,
      };
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };

      const response = await API.patch('/user', dataToSend, {headers});
      console.log('Success change avatar', response.data);
      dispatch({
        type: UPDATE_AVATAR_AND_FULLNAME,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Center h={300}>
      <Button
        onPress={() => setShowModal(true)}
        ref={ref}
        borderRadius="$full"
        width={10}
        h={40}
        p="$3.5"
        bg="white"
        borderColor="$indigo600">
        <ButtonIcon as={EditIcon} color="#12486B" />
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
              <View
                flexDirection="row"
                flexWrap="wrap"
                width={'100%'}
                justifyContent="space-between"
                gap={10}>
                <ListAllAvatar
                  handleAvatarClick={handleAvatarClick}
                  selectedAvatarId={selectedAvatarId}
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
            <Button
              size="sm"
              backgroundColor="#12486B"
              width={80}
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
                handleUpdateAvatar();
              }}>
              <ButtonText>Buy</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

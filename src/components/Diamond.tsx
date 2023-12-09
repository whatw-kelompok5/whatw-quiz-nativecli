import {AddIcon, ButtonIcon, Image} from '@gluestack-ui/themed';
import {
  Center,
  Button,
  ButtonText,
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBackdrop,
  View,
  Modal,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import diamond from '../assets/diamond.png';
import {useSelector} from 'react-redux';
import {RootState} from '../store/type/RootState';
import ListDiamond from './ListDiamond';
import Diamonds from '../mocks/diamond';
import {API} from '../libs/api';
import WebView from 'react-native-webview';
import {Alert} from 'react-native';

export default function Diamond({userDiamonds}: any) {
  const auth = useSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);
  const [selectedDiamondId, setSelectedDiamondId] = useState<any>(null);
  const [responseUrl, setResponseUrl] = useState<any>('');
  const [visiblePaymentModal, setVisiblePaymentModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [orderID, setOrderID] = useState<any>('');

  const handleDiamondClick = (diamondId: any) => {
    setSelectedDiamondId(diamondId);
  };
  async function handleDiamondPayment() {
    try {
      const selectedDiamond = Diamonds.find(
        diamond => diamond.id === selectedDiamondId,
      );
      if (selectedDiamond) {
        const {id, price, quantity} = selectedDiamond;
        const dataToSend = {
          id,
          name: 'diamond',
          price,
          quantity,
        };
        console.log(dataToSend);
        const response = await API.post('/midtrans/transaction', {
          ...dataToSend,
          email: auth.email,
          fullname: auth.fullname,
        });

        setOrderID(response.data.data.orderId);
        setResponseUrl(response.data.data.payment_url);

        console.log(response.data);

        openLinkInWebView();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getstatus() {
    const url = `https://api.sandbox.midtrans.com/v2/${orderID}/status`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  function checkPayment() {
    setLoading(true);
    getstatus().then(data => {
      if (data.status_code == 200) {
        console.log(data);
        setLoading(false);
        Alert.alert('This Order ID has been paid');
        setVisiblePaymentModal(false);
      } else {
        console.log(data);
        setLoading(false);
        Alert.alert('This Order ID has not been paid');
      }
    });
  }

  const WEB_PAGE_URL = responseUrl;
  const openLinkInWebView = () => setVisiblePaymentModal(true);
  return (
    <View>
      <View
        bg="white"
        height={42}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        borderColor="#12486B"
        borderRadius="$3xl"
        paddingRight={1}
        paddingLeft={2}>
        <Image
          source={diamond}
          alt="logo"
          width={30}
          height={25}
          marginRight={6}
        />
        <ButtonText
          color="black"
          fontSize={15}
          fontWeight="bold"
          marginRight={8}>
          {userDiamonds}
        </ButtonText>
        <Center h={300}>
          <Button
            onPress={() => setShowModal(true)}
            ref={ref}
            borderRadius="$full"
            width={10}
            h={40}
            bg="#12486B"
            borderColor="$indigo600"
            $active-bgColor="#F5F5F5">
            <ButtonIcon as={AddIcon} color="white" />
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
                    <Heading size="lg">Gets your diamon now</Heading>
                  </View>
                  <View
                    flexDirection="row"
                    flexWrap="wrap"
                    width={'100%'}
                    justifyContent="space-between"
                    gap={10}>
                    <ListDiamond
                      handleDiamondClick={handleDiamondClick}
                      selectedDiamondId={selectedDiamondId}
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
                  $active-bgColor="#001524"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    handleDiamondPayment();
                    setShowModal(false);
                  }}>
                  <ButtonText>Confirm</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
      </View>
      <Modal
        padding={10}
        isOpen={visiblePaymentModal}
        onClose={() => setVisiblePaymentModal(false)}>
        <ModalContent width={'100%'} alignItems="center" display="flex">
          <ModalBody width={'110%'}>
            <WebView source={{uri: WEB_PAGE_URL}} height={500} width={'100%'} />
          </ModalBody>
          <ModalFooter display="flex" justifyContent="flex-end" width={'100%'}>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => setVisiblePaymentModal(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}

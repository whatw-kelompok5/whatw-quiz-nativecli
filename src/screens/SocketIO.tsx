import {View, Text, Button, Modal} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const WEB_PAGE_URL =
  'https://app.sandbox.midtrans.com/snap/v3/redirection/df340ec3-f1be-47a3-9fc9-ece12cae1f6e';

const SocketIO = () => {
  const [visiblePaymentModal, setVisiblePaymentModal] = React.useState(false);

  const openLinkInWebView = () => setVisiblePaymentModal(true);
  return (
    <View>
      <Text>SocketIO</Text>
      <Button title="Open Link" onPress={openLinkInWebView} />
      <Modal
        visible={visiblePaymentModal}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <WebView source={{uri: WEB_PAGE_URL}} />
      </Modal>
    </View>
  );
};

export default SocketIO;

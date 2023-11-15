import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '994994580988-7clgufo1tlbqdgbr69paqiiicog1pir9.apps.googleusercontent.com',
});

const App = () => {
  const [id, setId] = useState<string | null>(null);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    setId(idToken);
    console.log(idToken);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setId(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (id === null) {
    return <Button title="Google Sign-In" onPress={onGoogleButtonPress} />;
  }
  return (
    <View>
      <Text>App</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default App;

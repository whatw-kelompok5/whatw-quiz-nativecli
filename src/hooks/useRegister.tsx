import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '994994580988-7clgufo1tlbqdgbr69paqiiicog1pir9.apps.googleusercontent.com',
});

export function useRegister() {
  const [id, setId] = useState<string | null>(null);
  const [emailUser, setEmailUser] = useState({
    email: '',
  });
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const userInfo = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
    );
    const userInfoJSON = await userInfo.json();
    setId(idToken);
    setEmailUser({
      email: userInfoJSON.email,
    });

    return {onGoogleButtonPress};
  }
}

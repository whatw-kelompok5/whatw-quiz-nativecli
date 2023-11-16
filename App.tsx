import {GluestackUIProvider} from '@gluestack-ui/themed';
import React from 'react';
import {config} from '@gluestack-ui/config';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Task from './src/screens/Task';
import SplashScreenComponent from './src/screens/SplashScreen';
import Matching from './src/screens/Matching';
import WinnerComponent from './src/screens/Winner';
import StartGameComponent from './src/screens/StartGame';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="StartGame" component={StartGameComponent} />
          <Stack.Screen name="Winner" component={WinnerComponent} />
          <Stack.Screen name="Matching" component={Matching} />
          <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
        </Stack.Navigator>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

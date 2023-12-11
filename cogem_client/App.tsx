import React, {useEffect} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigators/RootStackNavigator';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
// import { StyleSheet, Text, View } from 'react-native';
//import Main from './screens/MainComponent';
import Login from './screens/LoginScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
}

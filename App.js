import React from 'react'
import { NativeBaseProvider, Box } from 'native-base';
import ChatScreen from './app/screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './app/navigations/StackNavigation';
import AuthProvider from './app/provider/AuthProvider';
const App = () => {
  return (
    <NativeBaseProvider>
        <AuthProvider>
           <StackNavigation/>
        </AuthProvider>
    </NativeBaseProvider>
  )
}



export default App

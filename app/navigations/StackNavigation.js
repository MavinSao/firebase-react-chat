import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import ChatRoom from '../screens/ChatRoom';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../provider/AuthProvider';
import { Avatar, Box, Button, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import CreateRoom from '../screens/CreateRoom';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}}  name="Login" component={LoginScreen}/>
            <Stack.Screen options={{headerShown: false}}  name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}

const MainStack = () => {
    let { auth, setAuth } = useContext(AuthContext)
    return (
        <Stack.Navigator>
            <Stack.Screen name="Room" component={ChatRoom} 
             options={({navigation})=>({
                headerLeft: () => (
                    <Box>
                    <IconButton
                      size="sm"
                      _icon={{
                        as: Icon,
                        name: "arrow-back-circle-outline",
                      }}
                      onPress={() => setAuth({auth:false,payload:null})}
                    />
                    </Box>
                ),
                headerRight: () => (
                <>
                <Avatar
                    size="sm"
                    source={{
                      uri: "https://ui-avatars.com/api/?name="+auth.payload.username,
                    }}
                    mx={2}
                  />
                   <Box>
                    <IconButton
                      size="sm"
                      _icon={{
                        as: Icon,
                        name: "add-circle-outline",
                      }}
                      onPress={() => navigation.navigate("CreateRoom")}
                    />
                    </Box>
                </> 
                ),
              })}
            />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.thread.name
          })}
        />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        </Stack.Navigator>
    )
}

const StackNavigation = () => {

    let { auth } = useContext(AuthContext)

    return (
        <NavigationContainer>
            {auth.isAuth ? <MainStack/> : <AuthStack/> }
        </NavigationContainer>
    )
}

export default StackNavigation

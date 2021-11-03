import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base'
import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { borderColor } from 'styled-system'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../provider/AuthProvider';

const LoginScreen = ({ navigation }) => {

    var { setAuth } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const singIn = async()=>{
        auth().signInWithEmailAndPassword(email,password).then((userCredential)=>{
            const uid = userCredential.user.uid;
            firestore().collection('Users').doc(uid).get().then((response) => {
                console.log("user:",response._data)
                setAuth({
                    isAuth: true,
                    payload: response._data
                })
            }).catch(err=>{
                alert(err)
            })
           
        })
    }

    return (
        <Box
        safeArea
        flex={1}
        flexDirection="row"
        alignItems="center"
        p={2}
        w="100%"
        mx="auto"
        backgroundColor="white"
    >
        <VStack
            flex={1}
            px={5}
        >
            <VStack width="100%">
                <Heading fontSize={40}>
                    Login
                </Heading>
                <Heading my={2} color="muted.400" size="lg">
                    Connect with your friends
                </Heading>
                <VStack my={5}>
                    <FormControl>
                        <FormControl.Label _text={{ color: 'muted.700', fontSize: 'md', fontWeight: 600 }}>
                            Email
                        </FormControl.Label>
                        <Input _focus={{ borderColor: 'black' }} onChangeText={setEmail}/>
                    </FormControl>
                    <FormControl my={5}>
                        <FormControl.Label  _text={{ color: 'muted.700', fontSize: 'md', fontWeight: 600 }}>
                            Password
                        </FormControl.Label>
                        <Input _focus={{ borderColor: 'black' }} type="password" onChangeText={setPassword}/>
                    </FormControl>
                    <Button mt={4} backgroundColor="black"
                        onPress={singIn}
                    >
                        Login
                    </Button>
                    <Button mt={4} backgroundColor="dark.500"
                        onPress={() => navigation.push("Register")}
                    >
                        Register
                    </Button>

                </VStack>
            </VStack>
        </VStack>
    </Box>
    )
}

export default LoginScreen

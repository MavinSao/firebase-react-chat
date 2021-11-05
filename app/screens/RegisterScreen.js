import { Box, HStack, FormControl, Input, Button, Heading, VStack, ZStack } from 'native-base'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Circle } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onSignUp = ()=>{
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => { 
            // console.log("res",res.user.uid);
            let uid = res.user.uid
            firestore()
            .collection('Users')
            .doc(uid)
            .set({
                uid,
                email,
                username,
            })
            alert('User account created & signed in!')
            navigation.pop()
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
            }
            alert(error);
        });
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
            <TouchableOpacity style={{position: 'absolute', top:50, left:10}}onPress={() => navigation.pop()}>
                <Icon name="chevron-back-outline" color="black" size={35} />
            </TouchableOpacity>
            <VStack
                flex={1}
                px={5}
            >
                <VStack width="100%">
                    <Heading fontSize={40}>
                        Register
                    </Heading>
                    <Heading my={2} color="muted.400" size="lg">
                        Signup to login
                    </Heading>
                    <VStack my={5}>
                        <FormControl>
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'md', fontWeight: 600 }}>
                                Email
                            </FormControl.Label>
                            <Input _focus={{ borderColor: 'black' }} onChangeText={setEmail}/>
                        </FormControl>
                        <FormControl my={5}>
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'md', fontWeight: 600 }}>
                                Username
                            </FormControl.Label>
                            <Input _focus={{ borderColor: 'black' }} onChangeText={setUsername}/>
                        </FormControl>
                        <FormControl >
                            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'md', fontWeight: 600 }}>
                                Password
                            </FormControl.Label>
                            <Input type="password" _focus={{ borderColor: 'black' }} onChangeText={setPassword}/>
                        </FormControl>
                        <Button mt={4} backgroundColor="black"
                            onPress={onSignUp}
                        >
                            Register
                        </Button>

                    </VStack>
                </VStack>
            </VStack>
        </Box>
    )
}

export default RegisterScreen

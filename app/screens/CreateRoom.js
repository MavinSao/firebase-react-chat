import { Box, Button, Heading, Input, Stack } from 'native-base'
import React from 'react'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { createChatRoom } from '../service/app.service'

const CreateRoom = ({ navigation }) => {

    const [roomName, setRoomName] = useState()

    const onCreateRoom = () => {
        createChatRoom(roomName, () => {
            navigation.navigate("Room")
        })
    }

    return (
        <Box flex={1} backgroundColor={"white"} justifyContent="center" flexDirection="row" >
            <Stack width="90%" mt={20}>
                <Heading size="3xl">Room Name</Heading>
                <Input placeholder="Room Name" my={5} _focus={{ borderColor: 'black' }} onChangeText={setRoomName} />
                <Button backgroundColor="black" onPress={onCreateRoom}>Create Room</Button>
           </Stack>
        </Box>
    )
}

export default CreateRoom

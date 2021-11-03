import { Box, Heading, Input, Stack } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'

const CreateRoom = () => {
    return (
        <Box flex={1} backgroundColor={"white"} flexDirection="row" justifyContent="center" alignContent="center">
           <Stack>
           <Heading size="xl">Room Name</Heading>
           <Input/>
           </Stack>
        </Box>
    )
}

export default CreateRoom

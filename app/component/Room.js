import { Avatar, Box, HStack, Spacer, VStack, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'

const Room = (props) => {
    const { room } = props

    const toDateTime = (timestamp) => {
        var h = new Date(timestamp).getHours();
        var m = new Date(timestamp).getMinutes();

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var d = new Date(timestamp);
        var dayName = days[d.getDay()];

        h = (h < 10) ? '0' + h : h;
        m = (m < 10) ? '0' + m : m;

        return dayName + ' ' + h + ':' + m;
    }

    return (
        <Box
            borderBottomWidth="1"
            _dark={{
                borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            px="3"
            py="2"
        >
            <HStack space={3} justifyContent="space-between">
                <Avatar
                    size="48px"
                    source={{
                        uri: "https://kshrd.com.kh/static/media/logo.f368c431.png",
                    }}
                />
                <VStack width="60%">
                    <Text
                        _dark={{
                            color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        fontSize="md"
                        bold

                    >
                        {room.name}
                    </Text>
                    <Text
                        color="coolGray.600"
                        _dark={{
                            color: "warmGray.200",
                        }}
                    >
                        {room.latestMessage.text}
                    </Text>
                </VStack>
                <Text
                    fontSize="xs"
                    _dark={{
                        color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                >
                    {toDateTime(room.latestMessage.createdAt)}
                </Text>
            </HStack>
        </Box>
    )
}

export default Room

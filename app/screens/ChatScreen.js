import { Image } from 'native-base'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { AuthContext } from '../provider/AuthProvider'

const ChatScreen = () => {

    let {auth} = useContext(AuthContext)

    return (
        <View>
            <Image alt="test" width={200} height={200} source={{uri:"https://ui-avatars.com/api/?name="+auth.payload.username}}/>
            <Text>{auth.payload.username}</Text>
        </View>
    )
}

export default ChatScreen

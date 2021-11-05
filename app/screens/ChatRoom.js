import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FlatList, Spinner } from 'native-base';
import Room from '../component/Room';

const ChatRoom = ({ navigation }) => {
    const [threads, setThreads] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const threads = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        name: '',
                        latestMessage: { text: '' },
                        ...documentSnapshot.data()
                    }
                })
                setThreads(threads)
                console.log(threads)
                if (loading) {
                    setLoading(false)
                }
            })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return <Spinner size="lg" />
    }

    return (
        <View backgroundColor="white" flex={1}>
            <FlatList
                data={threads}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { thread: item })}>
                        <Room room={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default ChatRoom

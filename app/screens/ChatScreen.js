import React, { useContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { AuthContext } from '../provider/AuthProvider'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import { createMessage } from '../service/app.service'
// import auth from '@react-native-firebase/auth'


const ChatScreen = ({ navigation, route }) => {



    const [messages, setMessages] = useState([])

    let { auth } = useContext(AuthContext)
    const { thread } = route.params

    useEffect(() => {
        const unsubscribeListener = firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }

                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.displayName
                        }
                    }

                    return data
                })

                setMessages(messages)
            })

        return () => unsubscribeListener()
    }, [])


    const handleSend = async (newMessage = []) => {

        const text = newMessage[0].text

        firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .collection('MESSAGES')
            .add(
                {
                    text: text,
                    createdAt: new Date().getTime(),
                    user: {
                        _id: auth.payload.uid,
                        displayName: auth.payload.username
                    }
                }
            )
        await firestore()
            .collection('MESSAGE_THREADS')
            .doc(thread._id)
            .set(
                {
                    latestMessage: {
                        text: text,
                        createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            )

        setMessages(GiftedChat.append(messages, newMessage))


    }

    return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{
                _id: auth.payload.uid
            }}
        />
    )
}

export default ChatScreen

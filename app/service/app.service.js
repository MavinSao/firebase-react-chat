import firestore from '@react-native-firebase/firestore';

export const createChatRoom = (roomName, cb) => {
    firestore()
        .collection('MESSAGE_THREADS')
        .add({
            name: roomName,
            latestMessage: {
                text: `${roomName} created. Welcome!`,
                createdAt: new Date().getTime()
            }
        })
        .then(docRef => {
            docRef.collection('MESSAGES').add({
                text: `${roomName} created. Welcome!`,
                createdAt: new Date().getTime(),
                system: true
            })
            cb()
        })
}

export const createMessage = async (message, user, thread) => {
    await firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .set(
            {
                latestMessage: {
                    text,
                    createdAt: new Date().getTime()
                }
            },
            { merge: true }
        )
}
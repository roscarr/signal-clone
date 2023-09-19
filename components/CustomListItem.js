import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/themed'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const CustomListItem = ({id,chatName,enterChat}) => {
  const [chatMessage, setChatMessage] = useState([])
  useEffect(()=>{
    const getCollection=collection(db,'chats')
    const getDocumentRef=doc(getCollection,id)
    const getSubData=query(collection(getDocumentRef,'messages'),orderBy('timestamp','desc'))
    const unsubscribe=onSnapshot(getSubData,snapshot=>{
      setChatMessage(snapshot.docs.map(doc=>doc.data()))
  })
  return unsubscribe
  },[])
  return (
    <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
      <Avatar 
      rounded
      source={{uri:chatMessage?.[0]?.photoURL ||
        'https://cope-cdnmed.agilecontent.com/resources/jpg/7/0/1673121316107.jpg'}}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight:'800'}}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
         {chatMessage?.[0]?.displayName}: {chatMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem
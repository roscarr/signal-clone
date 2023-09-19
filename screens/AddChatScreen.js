import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Input } from '@rneui/themed'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

const AddChatScreen = () => {
  const navigation=useNavigation()
  const [input, setInput] = useState("")
  useLayoutEffect(()=>{
      navigation.setOptions({
        title:'Add a new chat'
      })
  },[])

  const createChat=()=>{
     addDoc(collection(db,'chats'),{
      chatname:input
    }).then(()=>{
      navigation.goBack()
    }).catch((error)=>alert(error))
  }
  return (
    <View style={styles.container}>
      <Input placeholder='Enter a chat name'
      value={input}
      onChangeText={(text)=>setInput(text)}
      onSubmitEditing={createChat}
      leftIcon={()=>(
        <Icon name='wechat'
        type='antdesign'
        size={24}
        color='black'
        />
      )}
      />
      <Button
      onPress={createChat}
      title='create a new chat'
      disabled={!input}
      />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    padding:30,
    height:'100%'
  }
})
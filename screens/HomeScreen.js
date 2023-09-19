import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Icon } from '@rneui/themed'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'

const HomeScreen = () => {
  const navigation=useNavigation()
  const [chats, setChats] = useState([])
  const signOutUser=()=>{
    signOut(auth).then(()=>{
      navigation.replace('Login')
    }).catch(error=>alert(error))
  }
  useEffect(()=>{
     getData()
  },[])
  const getData=()=>{
    const data=collection(db,'chats')
    onSnapshot(data,response=>{
      setChats(response.docs.map(doc=>({id:doc.id,data:doc.data()})));
    })
  }
  useLayoutEffect(()=>{
    navigation.setOptions({
      title:'Signal',
      headerStyle:{ backgroundColor:'#fff'},
      headerTitleStyle:{color:'black'},
      headetTintColor:'black',
      headerLeft:()=>(
        <View style={{marginLeft:20,marginRight:30}}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
             <Avatar rounded source={{uri:auth?.currentUser?.photoURL}}/>
          </TouchableOpacity>
        </View>
      )
      ,headerRight:()=>(
        <View style={{flexDirection:'row',justifyContent:'space-between',width:80,
        marginRight:20}}>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon 
            name='camerao'
            color='black'
             type='antdesign'
             size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChat')}>
            <Icon 
            name='pencil'
            color='black'
             type='simple-line-icon'
             size={24}
            />
          </TouchableOpacity>
        </View>
      )
    })
  },[navigation])
  const enterChat=(id,chatName)=>{
       navigation.navigate('Chat',{
        id,
        chatName
       })
  }
  return (
    <View>
      <ScrollView style={styles.container}>
        {chats.map(({id,data:{chatname}})=>(
               <CustomListItem key={id} id={id} chatName={chatname} 
               enterChat={enterChat}
               />
        ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
  container:{
    height:'100%'
  }
})
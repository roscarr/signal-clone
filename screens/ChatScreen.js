import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { TouchableWithoutFeedback } from "react-native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMesage = async () => {
    Keyboard.dismiss();
    const mainCollection = collection(db, "chats");
    const newDocumentRef = doc(mainCollection, route.params.id);
    const subcollection = collection(newDocumentRef, "messages");
    await addDoc(subcollection, {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };
  useLayoutEffect(() => {
    
    const getCollection = collection(db, "chats");
    const getDocumentRef = doc(getCollection, route.params.id);
    const getSubData = query(collection(getDocumentRef, "messages"),orderBy('timestamp','desc'));
    const unsubscribe = onSnapshot(getSubData, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, [route]);
  return (
    <View>
      <View
        style={{
          backgroundColor: "#0284c7",
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" type="antdesign" size={24} color="white" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 30,
            flex: 1,
          }}
        >
          <Avatar
            rounded
            source={{
              uri:messages[0]?.data.photoURL ||
               "https://cope-cdnmed.agilecontent.com/resources/jpg/7/0/1673121316107.jpg",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
          }}
        >
          <TouchableOpacity>
            <Icon
              name="video-camera"
              type="font-awesome"
              color="white"
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="call" type="ionicon" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={90}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <ScrollView contentContainerStyle={{paddingTop:15}}>
                {messages.map(({ id, data }) =>
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.reciever}>
                      <Avatar 
                      rounded
                      position='absolute'
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{uri:data.photoURL}}
                      />
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View key={id} style={styles.sender}>
                      <Avatar rounded
                      position='absolute'
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{uri:data.photoURL}} />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>{data.displayName}</Text>
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.footer}>
                <TextInput
                  placeholder="signal message"
                  style={styles.textInput}
                  value={input}
                  onSubmitEditing={sendMesage}
                  onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={sendMesage}>
                  <Icon name="send" size={24} type="ionicos" color="#2B68E6" />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    height: "94%",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 15,
  },
  textInput: {
    backgroundColor: "#ECECEC",
    padding: 10,
    height: 40,
    color: "gray",
    flex: 1,
    borderRadius: 30,
    bottom: 0,
    marginRight: 15,
  },
  sender: {
    backgroundColor:'#2B68E6',
    padding:15,
    marginBottom:20,
    marginLeft:15,
    alignSelf:'flex-start',
    maxWidth:'80%',
    borderRadius:20,
    position:'relative'
  },
  senderText:{
    color:'white',
    fontWeight:'500',
    marginLeft:10,
    marginBottom:15
  },
  senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:'white'
  },
  reciever: {
    backgroundColor:'#ECECEC',
    padding:15,
    marginBottom:20,
    marginRight:15,
    alignSelf:'flex-end',
    maxWidth:'80%',
    borderRadius:20,
    position:'relative'
  },
  recieverText: {
    color:'black',
    fontWeight:'500',
    marginLeft:10
  },
});

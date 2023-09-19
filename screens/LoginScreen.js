import { View, Text, Image, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation=useNavigation()
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
       if (authUser) {
        navigation.replace('Home')
       }
    })
    return unsubscribe
  },[])
  const signIn=()=>{
     signInWithEmailAndPassword(auth,email,password).catch((error)=>alert(error))
  }
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: "https://seeklogo.com/images/S/signal-messenger-logo-9255C8BC3C-seeklogo.com.png",
        }}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus type='Email' value={email} 
        onChangeText={text=>setEmail(text)}
        />
        <Input placeholder="Password" autoFocus type='Password' secureTextEntry
        value={password} 
        onChangeText={text=>setPassword(text)}
        onSubmitEditing={signIn}
        />
      </View>
      <Button title='Login' onPress={signIn} style={styles.button}
      buttonStyle={{width:200,marginTop:10}}
      />
      <Button title='Register' type="outline" style={styles.button}
      onPress={()=>navigation.navigate('Register')}
      buttonStyle={styles.button}
      />
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    padding:10
  },
  inputContainer: {
    width:300
  },
  button:{
    width:200,
    marginTop:10,
  }
});
export default LoginScreen;

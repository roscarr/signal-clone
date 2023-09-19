import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input,Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigation=useNavigation()
  /*useLayoutEffect(()=>{
     navigation.setOptions({
        title: "Title screen",
          headerBackTitle: "Go back..."
     })
  },[navigation])
*/
  const register=()=>{
     createUserWithEmailAndPassword(auth,email,password).then(
     ( authUser)=>{
          updateProfile(authUser.user,{
            displayName:name,
            photoURL:imageUrl|| 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg'
          })
        
      }
     ).catch((error)=>alert(error.message))
  }

  return (
    <KeyboardAvoidingView  behavior='height' style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 20 }}>Create a signal account</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
         
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
           secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile picture URL (Optional)"
          autoFocus
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
       buttonStyle={styles.button}
      title='Register'
      onPress={register}
      raised
      />
      <View 
      style={{height:100}}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    backgroundColor:'white'
  },
  inputContainer: {
    width:300
  },
  button:{ 
    width:200,
    marginTop:10
  }
});

export default RegisterScreen;

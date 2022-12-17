import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Image, Dimensions } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Input } from "@rneui/base";
import {  loginChild, reset } from "../redux/AuthSlice";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';



export default function SignInChild({ navigation: { goBack },isChild, setIsChild} ) {

  const [connectionToken, setConnectionToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  

  const setChildStateTrue =()=>{
    setIsChild(true)
    console.log(isChild,"child state");
  }

  const { user,child, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

// useEffect(()=>{
//   isChild===true?
//   navigation.navigate("Content"):
//   ""
// },[isChild])

useEffect(() => {
  if (isError) {
    console.log(message);
  }

  if (isSuccess===true) {
    setChildStateTrue()
    console.log("eeeeeeeeeeeee");
    navigation.navigate("Content")
  }
  dispatch(reset);

}, [user, isError, isSuccess, message, navigation, dispatch]);
// useEffect(()=>{
//   if(child)
//  { 
//   console.log("exicts");
//   dispatch(reset);}
// },[child])
  // useEffect(() => {
  //   // if (!child) {
  //   //   Toast.show({
  //   //          type: 'error',
  //   //          text1: 'Error',
  //   //          text2: 'Connection token not correct' 
  //   //        })
  //   //        console.log("message error");
  //   //        navigation.navigate("WelcomePage");
  //   // }

  //   if ( isSuccess) {

  //     console.log("exists");
  //     setChildStateTrue()
  //     console.log(user.connectionToken,"connection Token");
   
      
  //   }

  //   dispatch(reset);
  // }, [ child,  dispatch]);


  
  const onSubmit =  (e) => {
    e.preventDefault();
    const userData = {
      connectionToken
    };

    console.log(userData, "connection token 1");
     dispatch(loginChild(userData));
    setChildStateTrue()
    console.log("eeeeeeeeeeeee");
     navigation.navigate("Content")
    
    

  };

  return (
    <Formik initialValue={{ connectionToken: "" }}

    >
      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
        <View style={styles.container}>
                    <View style={styles.imgView}>
        <Image
          source={require("../../assets/googlemap.png")}
          style={styles.img}
        />
      </View>
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <Input
              value={connectionToken}
              style={styles.Input}
              placeholder="Enter Your Connection Token"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setConnectionToken(text);
              }}
            
            />
          </View>


          
          <View>
          <Button
            title="Log In"
            onPress={onSubmit}
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#577399",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />
            <Button
              title="Go Back"
              onPress={() => goBack()}
              icon={{
                name: "arrow-right",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#495867",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
          </View>


          
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height:  Dimensions.get("window").height,
    marginBottom:400,

  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  Input: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  imgView: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    overflow: "hidden",
  },
  img: {
    height: 600,
    width: 420,
    top: -200,
    position: "relative",
    borderRadius: 50,
  },
});


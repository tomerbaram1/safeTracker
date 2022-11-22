import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Input } from "@rneui/base";
import { login, loginChild, reset } from "../redux/AuthSlice";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';



export default function SignIn({ navigation: { goBack } }) {

  const [connectionToken, setConnectionToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError===true) {
      Toast.show({
             type: 'error',
             text1: 'Error',
             text2: 'Connection token not correct' 
           })
           console.log(message,"message error");
           navigation.navigate("WelcomePage");
    }

    if (isSuccess===true) {
      console.log(isSuccess,"success");
      console.log(user.connectionToken,"connection Token");
    navigation.navigate("Content");
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, navigation, dispatch]);


  
  const onSubmit = (e) => {
    e.preventDefault();
    connectionToken
    console.log(connectionToken, "connection token 1");
    dispatch(loginChild(connectionToken));
    

  };

  return (
    <Formik initialValue={{ connectionToken: "" }}

    >
      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
        <View style={styles.container}>
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
          </View>


          <Button
            title="Child Log In"
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
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
});


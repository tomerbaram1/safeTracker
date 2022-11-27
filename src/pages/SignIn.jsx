
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Image, Dimensions, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Input } from "@rneui/base";
import { login, reset } from "../redux/AuthSlice";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

import signInErrors from "../error-messages/SignInErrors";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),

  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      "Must contain at least 8 chracters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});


export default function SignIn({ navigation: { goBack } }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const [errorTxtEmail, setErrorTxtEmail] = useState("")
  const [errorTxtPassword, setErrorTxtPassword] = useState("")

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError===true) {
      Toast.show({
             type: 'error',
             text1: 'Error',
             text2: 'Please try again later 🚀' 
           })
           console.log(message,"message error");
           navigation.navigate("SignIn");

    }

    if (isSuccess===true) {
      console.log(isSuccess,"success");
      console.log(user.fullName,"user");
    navigation.navigate("Content");
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, navigation, dispatch]);


  
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
    

    if (email.length == 0) {
      setErrorTxtEmail(signInErrors.email.required)
    }

    if (password == 0) {
      setErrorTxtPassword(signInErrors.password.required)
    } 
    
    else {
      dispatch(login({ email, password }));
      if (user) {
        navigation.navigate("Content");

      } else {
        navigation.navigate("SignIn");
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please try again later 🚀' 
        })
      }
    }
  };

  var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return (
    <Formik initialValue={{ email: "", password: "" }}
    validationSchema={SigninSchema}

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
              value={email}
              style={styles.Input}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setEmail(text);
                if (text.length == 0) {
                  setErrorTxtEmail(signInErrors.email.required)
                } else if (!text.match(validRegexEmail)) {
                  setErrorTxtEmail(signInErrors.email.notValid)
                } else {
                  setErrorTxtEmail("")
                }
              }}
            
            />
          </View>

          {errorTxtEmail ?
          <Text style={styles.errorText}>{errorTxtEmail}</Text> : 
          ""}

          <View style={styles.inputView}>
            <Input
              value={password}
              style={styles.Input}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
                if (text.length == 0) {
                  setErrorTxtPassword(signInErrors.password.required)
              } else if (text.length < 8) {
                  setErrorTxtPassword(signInErrors.password.tooShort)
              } else if (text.length > 16) {
                  setErrorTxtPassword(signInErrors.password.tooLong)
              } else {
                  setErrorTxtPassword('')
              }
              }}
            />
          </View>

          {errorTxtPassword ?
          <Text style={styles.errorText}>{errorTxtPassword}</Text> : 
          ""}

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

  errorText: {
    color: "red"
  }
});


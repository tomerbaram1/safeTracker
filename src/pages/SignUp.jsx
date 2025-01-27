import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Image,Dimensions } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register, reset } from "../redux/AuthSlice";
import { Input } from "@rneui/base";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),

  fullName: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Please enter your full name"),

  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      "Must contain at least 8 chracters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

  confirmPassword: Yup.string()
    .min(8, "must contain at least 8 characters")
    .oneOf([Yup.ref("password")], "your passwords do NOT match")
    .required("Confirm password is required"),

  phoneNumber: Yup.string()
    .min(10, "must be 10 digits")
    .max(10, "must be 10 digits")
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("enter your phoneNumber number"),
});

export default function SignIn({ navigation: { navigate, goBack } }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   // if ( isSuccess || user) {
  //   //   alert("User Registered")

  //   // }

  //   dispatch(reset);
  // }, [user, isError, isSuccess, message, dispatch]);



  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword ) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
        text2: 'Please try again 🚀' 
      })
    } else {
      const userData = {
        fullName,
        email,
        password,
        phoneNumber,
      };
      dispatch(register(userData))
      navigate("Content");

    }
  };

  return (

    <Formik
      initialValue={{
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
    >
      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
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
              value={fullName}
              style={styles.TextInput}
              placeholder="  Full name"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setFullName(text);
              }}
            />
          </View>
          {touched.fullName && errors.fullName && (
            <Text style={styles.errorTxt}>{errors.fullName}</Text>
          )}
          <View style={styles.inputView}>
            <Input
              value={email}
              style={styles.Input}
              autoComplete='email'
              clearButtonMode='while-editing'
              keyboardType='email-address'
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          {touched.email && errors.email && (
            <Text style={styles.errorTxt}>{errors.email}</Text>
          )}
          <View style={styles.inputView}>
            <Input
              value={phoneNumber}
              style={styles.Input}
              placeholder="Enter your phone number"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
            />
          </View>
          {touched.phoneNumber && errors.phoneNumber && (
            <Text style={styles.errorTxt}>{errors.phoneNumber}</Text>
          )}
          <View style={styles.inputView}>
            <Input
              value={password}
              style={styles.Input}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          {touched.password && errors.password && (
            <Text style={styles.errorTxt}>{errors.password}</Text>
          )}
          <View style={styles.inputView}>
            <Input
              value={confirmPassword}
              style={styles.Input}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
          )}
          <Button
            title="Register"
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
              name: "home",
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
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:400,
    height:  Dimensions.get("window").height,

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
    top: -100,
    position: "relative",
    borderRadius: 50,
  },
});

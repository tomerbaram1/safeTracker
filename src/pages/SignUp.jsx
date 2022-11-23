import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register, reset } from "../redux/AuthSlice";
import { Input } from "@rneui/base";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

import RegisterErrors from "../error-messages/RegisterErrors";

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

  const [errorTxtFullName, setErrorTxtFullName] = useState("")
  const [errorTxtEmail, setErrorTxtEmail] = useState("")
  const [errorTxtPhoneNumber, setErrorTxtPhoneNumber] = useState("")
  const [errorTxtPassword, setErrorTxtPassword] = useState("")
  const [errorTxtConfirmPassword, setErrorTxtConfirmPassword] = useState("")

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if ( isSuccess == true) {
      alert("User Registered")
      console.log(isSuccess);
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, dispatch]);


  const onSubmit = (e) => {
    e.preventDefault();

    if (fullName.length == 0) { 
      setErrorTxtFullName(RegisterErrors.fullName.required)
    } 
    if (email.length == 0) {
      setErrorTxtEmail(RegisterErrors.email.required)
    } 
    if (phoneNumber.length == 0) {
      setErrorTxtPhoneNumber(RegisterErrors.phoneNumber.required)
    }
    if (password == 0) {
      setErrorTxtPassword(RegisterErrors.password.required)
    }
    if (password !== confirmPassword ) {
      setErrorTxtConfirmPassword(RegisterErrors.confirmPassword.doNotMatch)
    } 
    if (confirmPassword == 0) {
      setErrorTxtConfirmPassword(RegisterErrors.confirmPassword.required)
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

  var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var validRegexPhoneNumber =  /^\d+$/;

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
      {({ touched, handleChange, handleBlur, setFieldTouched, handleSubmit, values }) => (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <Input
              value={fullName}
              style={styles.TextInput}
              placeholder="Full name"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setFullName(text);
                if (text.length == 0) {
                  setErrorTxtFullName(RegisterErrors.fullName.required)
                } else if (text.length < 3) {
                  setErrorTxtFullName(RegisterErrors.fullName.tooShort)
                } else if (text.length > 20) {
                  setErrorTxtFullName(RegisterErrors.fullName.tooLong)
                } else {
                  setErrorTxtFullName("")
                }
              }}
            />
          </View>

          {errorTxtFullName ?
          <Text style={styles.errorText}>{errorTxtFullName}</Text> : 
          ""}

          <View style={styles.inputView}>
            <Input
              value={email}
              style={styles.Input}
              type='email'
              autoComplete='email'
              clearButtonMode='while-editing'
              keyboardType='email-address'
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setEmail(text);
                if (text.length == 0) {
                  setErrorTxtEmail(RegisterErrors.email.required)
                } else if (!text.match(validRegexEmail)) {
                  setErrorTxtEmail(RegisterErrors.email.notValid)
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
              value={phoneNumber}
              style={styles.Input}
              placeholder="Enter your phone number"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (text.length == 0) {
                  setErrorTxtPhoneNumber(RegisterErrors.phoneNumber.required)
                } else if (text.length !== 10) {
                  setErrorTxtPhoneNumber(RegisterErrors.phoneNumber.notValid)
                } else if (!text.match(validRegexPhoneNumber) ) {
                  setErrorTxtPhoneNumber(RegisterErrors.phoneNumber.notValid)
                } else {
                  setErrorTxtPhoneNumber('')
                }
              }}
            />
          </View>

          {errorTxtPhoneNumber ?
          <Text style={styles.errorText}>{errorTxtPhoneNumber}</Text> : 
          ""}

          <View style={styles.inputView}>
            <Input
              value={password}
              style={styles.Input}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
                if (text.length == 0) {
                    setErrorTxtPassword(RegisterErrors.password.required)
                } else if (text.length < 8) {
                  setErrorTxtPassword(RegisterErrors.password.tooShort)
                } else if (text.length > 16) {
                  setErrorTxtPassword(RegisterErrors.password.tooLong)
                } else {
                  setErrorTxtPassword('')
                }
              }}
            />
          </View>

          {errorTxtPassword ?
          <Text style={styles.errorText}>{errorTxtPassword}</Text> : 
          ""}

          <View style={styles.inputView}>
            <Input
              value={confirmPassword}
              style={styles.Input}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (text.length == 0) {
                  setErrorTxtConfirmPassword(RegisterErrors.confirmPassword.required)
              } else if ((password !== text )) {
                setErrorTxtConfirmPassword(RegisterErrors.confirmPassword.doNotMatch)
              } else {
                setErrorTxtConfirmPassword('')
              }
              }}
            />
          </View>

          {errorTxtConfirmPassword ?
          <Text style={styles.errorText}>{errorTxtConfirmPassword}</Text> : 
          ""}

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

  errorText: {
    color: "red"
  }
});

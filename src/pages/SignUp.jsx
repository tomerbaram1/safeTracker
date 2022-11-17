

import React, { useContext, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, AsyncStorage, Button } from 'react-native';
import { Form, Formik } from 'formik'
import  axios  from 'axios'
import * as Yup from 'yup' 
import Spinner from 'react-native-loading-spinner-overlay'



import SignUp from './SignUp';
import WelcomePage from './WelcomePage';
import ParentPage from './ParentPage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { register, reset } from '../redux/AuthSlice';



const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
    
  fullName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Please enter your full name'),

  password: Yup.string()
    .min(8)
    .required('Please enter your password')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, 
    'Must contain at least 8 chracters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ),

  confirmPassword: Yup.string()
    .min(8, 'must contain at least 8 characters')
    .oneOf([Yup.ref('password')], 'your passwords do NOT match')
    .required('Confirm password is required'),

  phoneNumber: Yup.string()
    .min(10, 'must be 10 digits')
    .max(10, 'must be 10 digits')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('enter your phoneNumber number')
  
})


export default function SignIn({ navigation: { navigate, goBack }  }) {

  const [email,setEmail] = useState("")
  const [fullName,setFullName] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  // const { email, password } = formData;
  const dispatch = useDispatch();
  
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if ( isSuccess || user) {
      alert("User Registered")
      
      
      
    }

    dispatch(reset);
  }, [user, isError, isSuccess, message, dispatch]);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
    
    
    const userData = {
      fullName,
      email,
      password,
      phoneNumber
    };
    dispatch(register(userData))
    navigate('Content')

 
    // navigate('Content')
    
  }};

  return (
   
    
    <Formik
      initialValue={{    email: "",
      password: "", fullName: "", phoneNumber:"", confirmPassword:""}}
      // validationSchema={SignupSchema}
      >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
    <View style={styles.container}>
        <StatusBar style="auto" />


        <View style={styles.inputView}>
        <TextInput
        value={fullName}
        style={styles.TextInput}
        placeholder="Full name"
        placeholderTextColor="#003f5c"
        onChangeText={(text)=>{setFullName(text)}}
        />
        </View>
    
        <View style={styles.inputView}>
        <TextInput
        value={email}
        style={styles.TextInput}
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(text)=>{setEmail(text)}}
        />
        </View>
   
        <View style={styles.inputView}>
        <TextInput
        value={phoneNumber}
        style={styles.TextInput}
        placeholder="Enter your phone number"
        placeholderTextColor="#003f5c"
        onChangeText={(text)=>{setPhoneNumber(text)}}
        />
        </View>
          
        <View style={styles.inputView}>
        <TextInput
        value={password}
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(text)=>{setPassword(text)}}
        />
        </View>
        <View style={styles.inputView}>
        <TextInput
        value={confirmPassword}
        style={styles.TextInput}
        placeholder="Confirm Password"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(text)=>{setConfirmPassword(text)}}
        />
        </View>
        

        
          
        <View>
          <Button 
            styles={styles.submitBtn}
            title="Go Back"
            onPress={() => goBack()}

            /> 
        </View>

        <Button 
         styles={styles.submitBtn}
          title="Register"
          onPress={onSubmit}
        /> 
        
        </View>
        

)}
      </Formik>

)}


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
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    
    alignItems: "center",
  },
  
  TextInput: {
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
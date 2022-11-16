import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Button } from 'react-native';
import { Formik } from 'formik'
import  axios  from 'axios'
import * as Yup from 'yup' 
import Spinner from 'react-native-loading-spinner-overlay'
import WelcomePage from './WelcomePage';
import SignIn from './SignIn';
import { AuthContext } from '../Context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';

// const SignupSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Please enter your email address'),
    
//   fullName: Yup.string()
//     .min(2, 'Too Short')
//     .max(50, 'Too Long')
//     .required('Please enter your full name'),

//   password: Yup.string()
//     .min(8)
//     .required('Please enter your password')
//     .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, 
//     'Must contain at least 8 chracters, at least one uppercase letter, one lowercase letter, one number and one special character'
//     ),

//   confirmPassword: Yup.string()
//     .min(8, 'must contain at least 8 characters')
//     .oneOf([Yup.ref('password')], 'your passwords do NOT match')
//     .required('Confirm password is required'),

//   phoneNumber: Yup.string()
//     .min(10, 'must be 10 digits')
//     .max(10, 'must be 10 digits')
//     .matches(/^[0-9]+$/, 'Must be only digits')
//     .required('enter your phoneNumber number')
  
// })

export default function SignUp({ navigation: { navigate, goBack  } }) {

  // const onSubmit = (values) => {
  //   navigate('Content')

  // //     axios.post('http://192.168.1.174:4000/users/signup', {
  // //       email: values.email,
  // //       phoneNumber: values.phoneNumber,
  // //       fulName: values.fulName,
  // //       password: values.password,
  // //       confirmPassword: values.confirmPassword
  // //     })
  // //     .then(data => {Alert.alert('succes'), console.log(data.data);})
  // }

  const [fullName, setFullName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const dispatch = useDispatch();
  
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else {
      const userData = {
        fullName,
        phoneNumber,
        email,
        password,
      };

      dispatch(register(userData));
    }

  return (

    <Formik 
    // validationSchema={SignupSchema}
   
    >

      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

        <View style={styles.container}>
          <StatusBar barStyle={'dark-content'} />

          <Text style={styles.title}>Sign Up</Text>

            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} 
                placeholder="Email Address" 
                autoCapitalize={false}
                value={email}
                onChangeText={(text)=>{setEmail(text)}}
                onBlur={() => setFieldTouched('email')}/>
            </View>
  
            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
              
            <View style={styles.inputWrapper}>
              <TextInput style={styles.inputStyle} 
                placeholder="phoneNumber"
                keyboardType='phone-pad'
                value={phoneNumber}
                onChangeText={(text)=>{setPhoneNumber(text)}}
                onBlur={() => setFieldTouched('phoneNumber')}/>
            </View>
            
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorTxt}>{errors.phoneNumber}</Text>
              )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="fullName" 
              autoCapitalize={false}
              value={fullName}
              
              onChangeText={(text)=>{setFullName(text)}}
              onBlur={() => setFieldTouched('fullName')}/>
          </View>

          {touched.fullName && errors.fullName && (
            <Text style={styles.errorTxt}>{errors.fullName}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="Password" 
              autoCapitalize={false}
              value={password}
              secureTextEntry={true}
              onChangeText={(text)=>{setPassword(text)}}
              onBlur={() => setFieldTouched('password')}/>
          </View>

          {touched.password && errors.password && (
            <Text style={styles.errorTxt}>{errors.password}</Text>
          )}

          <View style={styles.inputWrapper}>
            <TextInput style={styles.inputStyle} 
              placeholder="Confirm Password"
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={(text)=>{setConfirmPassword(text)}}
              onBlur={() => setFieldTouched('confirmPassword')}/>
          </View>

          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
          )}

          <TouchableOpacity 

            onPress={onSubmit} 
            disabled={!isValid}
            style={[styles.submitBtn,
              {backgroundColor: isValid ? '#395B64' : '#A5C9CA'}
            ]}>

            
         


            <Text styles={styles.submitBtnTxt}>Sign Up Now</Text>

          </TouchableOpacity>


          <Button 
            styles={styles.submitBtn}

            title="Already have an account? Sign in here"
            onPress={() => navigate('SignIn')}
              /> 
            <Button 
            title="Register"
            onPress={() =>register(fullName,email,phoneNumber,password,confirmPassword)}
             />


        
        <Button 
            styles={styles.submitBtn}
            title="Back to welcome page"
            onPress={() => goBack()}
          /> 

        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3333',
    paddingHorizontal: 15,
  },

  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20, 
    borderRadius: 20,
    width: '100%'
  },

  title: {
    marginTop: 50,
    color: '#16213E',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },

  inputWrapper: {
    marginBottom: 15
  },

  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },

  errorTxt: {
    fontSize: 12,
    color: '#FF0D10'
  },

  submitBtn: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center'
  },

  submitBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700
  }
})}

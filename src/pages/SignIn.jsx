import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, AsyncStorage, Button } from 'react-native';
import { Formik } from 'formik'
import  axios  from 'axios'
import * as Yup from 'yup' 
import Spinner from 'react-native-loading-spinner-overlay'
import SignUp from './SignUp';
import WelcomePage from './WelcomePage';
import ParentPage from './ParentPage';
import { AuthContext } from '../Context/AuthContext';

const SigninSchema = Yup.object().shape({
  
  email: Yup.string()
  .email('Invalid email')
  .required('Please enter your email address'),
  
  password: Yup.string()
  .min(8)
  .required('Please enter your password')
  .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, 
  'Must contain at least 8 chracters, at least one uppercase letter, one lowercase letter, one number and one special character'
  )
  
})

export default function SignIn({ navigation: { navigate, goBack }  }) {
  
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const {login,isLoading} = useContext(AuthContext)
  // const onSubmit = async (values) => {

  //   console.log('=======================================>>>>>>')
  //   const token = await AsyncStorage.getItem('signInToken')
  //   console.log('token:' + token);

  //     axios.post('http://10.195.25.149:4000/users/signin', {
  //       email: values.email,
  //       phoneNumber: values.phoneNumber,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       password: values.password,
  //       confirmPassword: values.confirmPassword
  //     })
  //     .then(res => {Alert.alert('succes'),
  //       console.log('=======================================>>>>>>'), 
  //       console.log(res.data), 
  //       AsyncStorage.setItem('signInToken', `${res.data.token}`)})
  //   }

  const onSubmit = async () => {
    navigation.navigate('Content')
  }

  return (
    <Formik 
    validationSchema={SigninSchema}
    >

      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

        <View style={styles.wrapper}>
          <Spinner visible={isLoading}/>
          <StatusBar barStyle={'dark-content'} />

          <Text style={styles.title}>Sign In</Text>
        
          
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
              placeholder="Password" 
              autoCapitalize={false}
              value={password}
              secureTextEntry
              onChangeText={(text)=>{setPassword(text)}}
              onBlur={() => setFieldTouched('password')}/>
          </View>

          {touched.password && errors.password && (
            <Text style={styles.errorTxt}>{errors.password}</Text>
          )}


          <TouchableOpacity 
            onPress={onSubmit} 
            disabled={!isValid}
            style={[styles.submitBtn,
              {backgroundColor: isValid ? '#395B64' : '#A5C9CA'}
          ]}>

            <Text styles={styles.submitBtnTxt}>Submit</Text>

          </TouchableOpacity>

          <View >
            <Button 
              styles={styles.submitBtn}
              title="Dont have an account? Sign up here"
              onPress={() => navigation.navigate(SignUp)}
            /> 
          </View>

          <View>
            <Button 
              styles={styles.submitBtn}
              title="Go Back"
              onPress={() => navigation.navigate(WelcomePage)}
            /> 
          </View>

          <Button 
            styles={styles.submitBtn}
            title="Log In"
            onPress={() => {login(email,password)}}
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
    paddingHorizontal: 15,
  },

  formContainer: {
    backgroundColor: '#F5EDDC',
    padding: 20, 
    borderRadius: 20,
    width: '100%'
  },

  title: {
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
    // backgroundColor: '#395B64',
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
});

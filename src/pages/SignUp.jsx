import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Button } from 'react-native';
import { Formik } from 'formik'
import  axios  from 'axios'
import * as Yup from 'yup' 

import WelcomePage from './WelcomePage';



export default function SignUp({ navigation: { navigate,goBack  } }) {

  // const onSubmit = (values) => {

  //     axios.post('http://192.168.1.174:4000/users/signup', {
  //       email: values.email,
  //       phoneNumber: values.phoneNumber,
  //       fulName: values.fulName,
  //       password: values.password,
  //       confirmPassword: values.confirmPassword
  //     })
  //     .then(data => {Alert.alert('succes'), console.log(data.data);})
  //   }

  return (
    <>
    <View>
    <Button
      title='Homepage'
      styles={{
        textAlign:"center"
      }}
      onPress={()=>{navigate('ParentHomePage')}}
      />
    <Button
      title='Homepage'
      styles={{
        textAlign:"center"
      }}
      onPress={()=>{navigate('ParentHomePage')}}
      />
    <Button
      title='Homepage'
      styles={{
        textAlign:"center"
      }}
      onPress={()=>{navigate('ParentHomePage')}}
      />
    <Button
      title='Homepage'
      styles={{
        textAlign:"center"
      }}
      onPress={()=>{navigate('ParentHomePage')}}
      />
    <Button
      title='Homepage'
      styles={{
        textAlign:"center"
      }}
      onPress={()=>{navigate('ParentHomePage')}}
      />
    <Button
      title='Homepage'
      styles={{
        textAlign:"center"
      }}
      onPress={()=>{navigate('ParentHomePage')}}
      />
      <Button 
      styles={{
        textAlign:"center"
      }}
      onPress={() => goBack()} title="Go back from ProfileScreen" />
    </View>
    </>
    // <Formik initialValues={{
    //   fulName: '',  
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    //   phoneNumber: ''
    // }}
    // validationSchema={SignupSchema}
    // onSubmit={values => onSubmit(values)}
    // >

    //   {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

    //     <View style={styles.container}>
          
    //       <StatusBar barStyle={'dark-content'} />

    //       <Text style={styles.title}>Sign Up</Text>

    //         <View style={styles.inputWrapper}>
    //           <TextInput style={styles.inputStyle} 
    //             placeholder="Email Address" 
    //             autoCapitalize={false}
    //             value={values.email}
    //             onChangeText={handleChange('email')}
    //             onBlur={() => setFieldTouched('email')}/>
    //         </View>
  
    //         {touched.email && errors.email && (
    //           <Text style={styles.errorTxt}>{errors.email}</Text>
    //           )}
              
    //         <View style={styles.inputWrapper}>
    //           <TextInput style={styles.inputStyle} 
    //             placeholder="phoneNumber"
    //             keyboardType='phone-pad'
    //             value={values.phoneNumber}
    //             onChangeText={handleChange('phoneNumber')}
    //             onBlur={() => setFieldTouched('phoneNumber')}/>
    //         </View>
            
    //         {touched.phoneNumber && errors.phoneNumber && (
    //           <Text style={styles.errorTxt}>{errors.phoneNumber}</Text>
    //           )}

    //       <View style={styles.inputWrapper}>
    //         <TextInput style={styles.inputStyle} 
    //           placeholder="Full Name" 
    //           value={values.fulName}
    //           onChangeText={handleChange('fulName')}
    //           onBlur={() => setFieldTouched('fulName')}/>
    //       </View>

    //       {touched.fulName && errors.fulName && (
    //         <Text style={styles.errorTxt}>{errors.fulName}</Text>
    //       )}


    //       <View style={styles.inputWrapper}>
    //         <TextInput style={styles.inputStyle} 
    //           placeholder="Password" 
    //           autoCapitalize={false}
    //           value={values.password}
    //           secureTextEntry={true}
    //           onChangeText={handleChange('password')}
    //           onBlur={() => setFieldTouched('password')}/>
    //       </View>

    //       {touched.password && errors.password && (
    //         <Text style={styles.errorTxt}>{errors.password}</Text>
    //       )}

    //       <View style={styles.inputWrapper}>
    //         <TextInput style={styles.inputStyle} 
    //           placeholder="Confirm Password"
    //           value={values.confirmPassword}
    //           secureTextEntry={true}
    //           onChangeText={handleChange('confirmPassword')}
    //           onBlur={() => setFieldTouched('confirmPassword')}/>
    //       </View>

    //       {touched.confirmPassword && errors.confirmPassword && (
    //         <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
    //       )}

    //       <TouchableOpacity 
    //         onPress={handleSubmit} 
    //         disabled={!isValid}
    //         style={[styles.submitBtn,
    //           {backgroundColor: isValid ? '#395B64' : '#A5C9CA'}
    //       ]}>

    //         <Text styles={styles.submitBtnTxt}>Submit</Text>

    //       </TouchableOpacity>


    //       <Button 
    //         styles={styles.submitBtn}
    //         title="Already have an account ? press here"
    //         onPress={() => navigation.navigate(WelcomePage)}
    //       /> 

    //     </View>
    //   )}
    // </Formik>
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
});

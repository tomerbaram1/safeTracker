import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, AsyncStorage, Button } from 'react-native';
import { Formik } from 'formik'
import  axios  from 'axios'



export default function SignIn({ navigation: { navigate,goBack  } }) {

  // const onSubmit = async (values) => {

  //   // console.log('=======================================>>>>>>')
  //   // const token = await AsyncStorage.getItem('signInToken')
  //   // console.log('token:' + token);

  //     axios.post('http://192.168.1.174:4000/users/signin', {
  //       email: values.email,
  //       phoneNumber: values.phoneNumber,
  //       firstName: values.firstName,
  //       lastName: values.lastName,
  //       password: values.password,
  //       confirmPassword: values.confirmPassword
  //     })
  //     .then(res => {Alert.alert('succes'),
  //       // console.log('=======================================>>>>>>'), 
  //       // console.log(res.data), 
  //       AsyncStorage.setItem('signInToken', `${res.data.token}`)})
  //       .then(()=>{})
  //   }

  return (
    <>
       <View>
      <Button
      styles={{
        textAlign:"center"
      }}
      title='Homepage'
      onPress={()=>{navigate('ParentHomePage')}}
      />

      <Button
      styles={{
        textAlign:"center"
      }}
       onPress={() => goBack()} title="Go back from Profile Screen" />
    </View>
    </>
    // <Formik initialValues={{
    //   email: '',
    //   password: '',
    // }}
    //     // onSubmit={values => onSubmit(values)}
    // >

    //   {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

    //     <View style={styles.container}>
          
    //       <StatusBar barStyle={'dark-content'} />

    //       <Text style={styles.title}>Sign In</Text>

          
    //       <View style={styles.inputWrapper}>
    //         <TextInput style={styles.inputStyle} 
    //           placeholder="Email Address" 
    //           autoCapitalize={false}
    //           value={values.email}
    //           onChangeText={handleChange('email')}
    //           onBlur={() => setFieldTouched('email')}/>
    //       </View>

    //       {touched.email && errors.email && (
    //         <Text style={styles.errorTxt}>{errors.email}</Text>
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

    //       <TouchableOpacity 
    //         onPress={handleSubmit} 
    //         disabled={!isValid}
    //         style={[styles.submitBtn,
    //           {backgroundColor: isValid ? '#395B64' : '#A5C9CA'}
    //       ]}>

    //         <Text styles={styles.submitBtnTxt}>Submit</Text>

    //       </TouchableOpacity> 

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

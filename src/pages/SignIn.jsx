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
import { login, reset } from '../redux/AuthSlice';



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
  
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  // const { email, password } = formData;
  const dispatch = useDispatch();
  
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if ( isSuccess) {
      alert("Logged In")
      
      
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
    console.log(email);
    console.log(password);
  
     
    
    console.log("data",email,password);
    dispatch(login({email,password}));
    console.log('disatch');
    navigate('Content')
    
  };

  return (
    
    
      <Formik
      initialValue={{    email: "",
      password: "",}}

      >
 {({ handleChange, handleBlur, handleSubmit, values }) => (
    <View style={styles.container}>
        <StatusBar style="auto" />
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
        value={password}
        style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(text)=>{setPassword(text)}}
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
          title="Log In"
          onPress={onSubmit}
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
// // const onSubmit = async (values) => {

// //   console.log('=======================================>>>>>>')
// //   const token = await AsyncStorage.getItem('signInToken')
// //   console.log('token:' + token);

// //     axios.post('http://10.195.25.149:4000/users/signin', {
// //       email: values.email,
// //       phoneNumber: values.phoneNumber,
// //       firstName: values.firstName,
// //       lastName: values.lastName,
// //       password: values.password,
// //       confirmPassword: values.confirmPassword
// //     })
// //     .then(res => {Alert.alert('succes'),
// //       console.log('=======================================>>>>>>'), 
// //       console.log(res.data), 
// //       AsyncStorage.setItem('signInToken', `${res.data.token}`)})
// //   }

// const onSubmit = async () => {
//   login()
// }

// const styles = StyleSheet.create({
  //   wrapper: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     paddingHorizontal: 15,
    //   },
    
    //   formContainer: {
      //     backgroundColor: '#F5EDDC',
      //     padding: 20, 
//     borderRadius: 20,
//     width: '100%'
//   },

//   title: {
//     color: '#16213E',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15
//   },

//   inputWrapper: {
//     marginBottom: 15
//   },

//   inputStyle: {
//     borderColor: '#16213E',
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10
//   },

//   errorTxt: {
//     fontSize: 12,
//     color: '#FF0D10'
//   },

//   submitBtn: {
//     // backgroundColor: '#395B64',
//     padding: 10,
//     borderRadius: 15,
//     justifyContent: 'center'
//   },

//   submitBtnTxt: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 700
//   }
// });

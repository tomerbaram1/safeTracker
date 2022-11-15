import {Text, StyleSheet, View, Button, Image} from 'react-native';
// import images from '../constans/images'

import { useNavigation } from '@react-navigation/native';

import SignIn from './SignIn';
import SignUp from './SignUp';

const WelcomePage = () => {

  const navigation = useNavigation();
  
  return (

    <View>
      
      <Text>Welcome page</Text>

      <SignIn />

      <Button 
          styles={styles.submitBtn}
          title="Havn't registerd yet ? press here"
          onPress={() => navigation.navigate(SignUp)}
          /> 
      
    </View>
  )
};

export default WelcomePage;

const styles = StyleSheet.create({
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
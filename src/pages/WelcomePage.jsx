
import {Text, StyleSheet, View, Button, Image} from 'react-native';
// import images from '../constans/images'

import SignIn from './SignIn';
import SignUp from './SignUp';

const WelcomePage = ({ navigation }) => (

    <View>
      
      <Text>Welcome page</Text>

      {/* <Image 
        source={images.Map_bg}
        styles={{

        }}
      /> */}

      <Button 
          styles={styles.submitBtn}
          title="Sign Up"
          onPress={() => navigation.navigate(SignUp)}
      /> 

       <Button 
          styles={styles.submitBtn}
          title="Sign In"
          onPress={() => navigation.navigate(SignIn)}
      />
      
    </View>
);

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
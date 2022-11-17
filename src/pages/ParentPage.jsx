import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {Linking} from 'react-native'


const ParentPage = ({sos, setSos}) => {
  return(
    <View style={styles.container}>
    <Text style={styles.text}>
      ParentPage
    </Text>
    {sos && (
      <View style={styles.SosCall}>
        <Text style={styles.SosCall}>
          SOS call from your child!
        </Text>
        <Button color={'white'} onPress={()=>Linking.openURL('tel: 0525848456')} title='Call the police'/>
        <Button color={'white'} title='Close' onPress={() => setSos(false)}/>
      </View>
    )}
  </View>
    )
};

export default ParentPage

const styles = StyleSheet.create({
  container:{

  },
  text:{
    marginTop:100,
    textAlign:'center'
  },
  SosCall:{
    backgroundColor:'#D51807',
    textAlign:'center',
    padding:5,
    color:'white',
    fontWeight:'700',
    borderRadius:10
  }


})
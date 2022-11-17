import React, { useState } from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const ChildPage = ({sos, setSos}) => {
  const [sosMsg, setSosMsg] = useState(false)
  const [sosactive, setSosactive] = useState(false)


  const longhandle =  () => {
    alert('SOS called!')
    setSosMsg(false)
    setSos(true)
  }

  const pressIn = () => {
    setSosMsg(true)
  }

  const pressOut = () => {
    setSosMsg(false)
  }
  
  return(
    <View style ={ styles.container}>
  <Pressable
  style={styles.trackBtn}
  >
    <Text
    style={styles.trackText}
    >
      START
    </Text>
    </Pressable>

    <Pressable
  style={sosMsg ? styles.sosBtnActive :  styles.sosBtn}
  delayLongPress={3000}
  onLongPress={longhandle}
  onPressIn={pressIn}
  onPressOut={pressOut}
  >
    <Text
    style={styles.sosText}>
      S O S
    </Text>
    </Pressable>
    {sosMsg &&(
      <Text
      style={styles.sosMsg}
      >
        Hold for 3 seconds
      </Text>
    )}
  </View>
)
};


export default ChildPage;

const styles = StyleSheet.create({
  container:{
    textAlign:'center'
  },
  trackBtn:{
    height:200,
    width:200,
    backgroundColor:"#577399",
    borderRadius:100,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    marginTop:200,
  },
  trackText:{
    color:'white',
    fontWeight:"800",
    fontSize:35,
    textAlign:'center'
  },
  sosBtn:{
    backgroundColor:"#D51807",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    padding:15,
    borderRadius:10,
    marginLeft:0,
    marginTop:90,
  },
  
  sosText:{
    color:'white',
    fontWeight:"800",
  },
  sosMsg : {
    marginTop: 100,
    textAlign:'center'
  },
  sosBtnActive:{
    backgroundColor:"#D51807",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:10,
    marginLeft:0,
    marginTop:90,
    padding:20,
    borderColor:'#c91100',
    borderWidth:4
  }
});



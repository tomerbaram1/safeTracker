import React from 'react';
import {Text, View, StyleSheet, Pressable, Touchable} from 'react-native';

const ChildPage = () => (
  <View>
  <Pressable
  style={styles.trackBtn}
  >
    <Text
    style={styles.trackText}>
      START
    </Text>
    </Pressable>
    <Pressable
  style={styles.sosBtn}
  >
    <Text
    style={styles.sosText}>
      SOS
    </Text>
    </Pressable>

    {/* MESSAGES */}

    <Text>
      Send your parent a message
    </Text>
    <View
    style={styles.msgs}
    >
      <Pressable style={styles.msgBtn} >
        <Text>
          Hi
        </Text>
      </Pressable>
      <Pressable style={styles.msgBtn}>
        <Text>
          What's up?
        </Text>
      </Pressable>
      <Pressable style={styles.msgBtn}>
        <Text>
          Call me
        </Text>
      </Pressable>
      <Pressable style={styles.msgBtn}>
        <Text>
          Where are you?
        </Text>
      </Pressable>
      <Pressable style={styles.msgBtn} >
        <Text>
          Add custom message
        </Text>
      </Pressable>
    </View>
  </View>
);

export default ChildPage;

const styles = StyleSheet.create({
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
    width:80,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    padding:15,
    borderRadius:10,
    marginLeft:60,
    marginTop:90,
    shadowColor: '#D51807',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 5,
 
    
  },
  sosText:{
    color:'white',
    fontWeight:"800"
  },
  msgs:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
  },
  msgBtn:{
    backgroundColor:"lightgray",
    padding:10,
    borderRadius:5,
    margin:10,
  }
});

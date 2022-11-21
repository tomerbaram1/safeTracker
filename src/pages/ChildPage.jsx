import {Text, View, StyleSheet, Pressable, Touchable} from 'react-native';

import axios from "axios"
import * as React from "react"
import { useEffect } from "react"
import { Dimensions ,Button, ScrollView, PermissionsAndroid, Alert } from "react-native"
import {Platform,Linking,AppState} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"


import { useState } from "react"
// import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import * as TaskManager from 'expo-task-manager';
import { AsyncStorage } from 'react-native';
import * as Notification from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
import { useRef } from "react";
import * as Application from 'expo-application';
import IO from "socket.io-client";
import * as Battery from 'expo-battery';

const LOCATION_TASK_NAME = 'background-location-task';
const SERVER_URL="http://10.195.25.155:4000";
const USERID="63738fb9e33a0195e497e318"


async function sendBatteryUpdate()
{

  const batteryLevel = Math.ceil(await Battery.getBatteryLevelAsync()*100);
  return batteryLevel

}



const ChildPage = () => {

  const responseListener = useRef();


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        startLocation()

      }
  
    })();
  }, []);


  async function startLocation() 
  {
   await Location.startLocationUpdatesAsync( LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 5, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 100, // minimum interval (in milliseconds) between updates
     
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    })
  }



      const [ region, setRegion ] = React.useState({
        latitude: 32.07962,
        longitude: 34.88911,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })

  
  
    
 


      TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data: { locations }, error }) => {
        const id="63738fb9e33a0195e497e318"
        const [location] = locations;
       const batteryLevel = await sendBatteryUpdate()
      
        console.log(batteryLevel,"battery")
        try {
    
      await axios.patch(SERVER_URL+"/api-map/users/parent/addChildrenLocation",{id:id,connectionToken:"c8d682c1-cd6b",
        currentLocation:location,token:"ExponentPushToken[Uh8EfSGwGP2wOYky3ImWmQ]",batteryLevel:batteryLevel})
         
        } catch (err) {
          console.error(err);
        }
      });

return(
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
)};


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
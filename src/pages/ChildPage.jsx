
import {Text, View, StyleSheet, Pressable, Touchable} from 'react-native';

import axios from "axios"
import * as React from "react"
import { useEffect } from "react"
import { Dimensions ,Button, ScrollView, PermissionsAndroid, Alert } from "react-native"
import {Platform,Linking,AppState} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

// import Geolocation from 'react-native-geolocation-service'r
import { useState } from "react"
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import * as TaskManager from 'expo-task-manager';
import { AsyncStorage } from 'react-native';
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useRef } from "react";
import * as Application from 'expo-application';
import IO from "socket.io-client";


const TASK_FETCH_LOCATION = 'background-location-task';
const SERVER_URL="http://10.195.25.104:4000";
const USERID="63738fb9e33a0195e497e318"

















const ChildHomePage = () => {

  const responseListener = useRef();









 


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      registerForPushNotificationsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
       
        return;
      }
  
    })();
  }, []);


    // useEffect(() => {
    // Permissions.getAsync(Permissions.NOTIFICATIONS)
    //   .then((statusObj) => {
    //     if (statusObj.status !== 'granted') {
    //       return Permissions.askAsync(Permissions.NOTIFICATIONS);
    //     }
    //     return statusObj;
    //   }).then(statusObj => {
    //     if (statusObj.status !== 'granted') {
    //       alert('Notifications will be unavailable now');
    //       return;
    //     }
    //   });
  

    //   socket.on('disTo', (msg) =>{ msg<75? triggerNotification() :"",console.log(counter)});*******
  // }, []);
  useEffect(()=> {

    // responseListener.current = Notification.addNotificationResponseReceivedListener(response => {
    //     console.log('--- notification tapped ---');
    //     console.log(response);
    //     console.log('------');
    // });

 
  // socket.emit('join')

  },[])



    
      
      useEffect(() => {
        console.log("notification")
        Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1, // minimum change (in meters) betweens updates
          deferredUpdatesInterval: 1, // minimum interval (in milliseconds) between updates
         
          // foregroundService is how you get the task to be updated as often as would be if the app was open
          foregroundService: {
            notificationTitle: 'Using your location',
            notificationBody: 'To turn off, go back to the app and switch something off.',
          },
        })
      }, []);




  
  
    
 


      TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
        const id="63738fb9e33a0195e497e318"
        const token= await AsyncStorage.getItem("NotificationToken")
        console.log(token,"**********************")
        if (error) {
          console.error(error);
          return;
        }
       
        const [location] = locations;
        console.log(location,"location")

        try {
    
        //   socket.emit('disOn', location,USERID)// you should use post instead of get to persist data on the backend
        // axios.patch(SERVER_URL+"/api-map/users/parent/pushNotification",{id:id,token:token,location:location})
        axios.patch(SERVER_URL+"/api-map/users/parent/addChildrenLocation",{id:id,connectionToken:"c8b682c1-cb6b",
        currentLocation:location,token:"ExponentPushToken[Uh8EfSGwGP2wOYky3ImWmQ]"})
          console.log(location.coords.latitude)
         
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


export default ChildHomePage;

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




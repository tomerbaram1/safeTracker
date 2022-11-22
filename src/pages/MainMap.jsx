import axios from "axios"
import * as React from "react"
import { useEffect } from "react"
import { Dimensions, StyleSheet, Text, View,Button, ScrollView, PermissionsAndroid, Alert, Platform } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
// import Geolocation from 'react-native-geolocation-service'r
import { useState } from "react";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { AsyncStorage } from 'react-native';
import * as Notification from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useRef } from "react";
import { TextInput } from "react-native-paper"
import IO, { Socket } from "socket.io-client";


const TASK_FETCH_LOCATION = 'background-location-task';

const SERVER_URL="http://172.20.10.4:4000";

const USERID="63738fb9e33a0195e497e318"


Notification.setNotificationHandler({
	handleNotification: async () => {
	  return {
		shouldShowAlert: true,
		shouldPlaySound: true
	  };
	}
  });
  

  const socket1 = IO(SERVER_URL, {
});


async function registerForPushNotificationsAsync() {
	let token;
  
	const { status: existingStatus } = await Notification.getPermissionsAsync();
	let finalStatus = existingStatus;
  
	if (existingStatus !== 'granted') {
		const { status } = await Notification.requestPermissionsAsync();
		finalStatus = status;
	}
	if (finalStatus !== 'granted') {
		alert('Failed to get push token for push notification!');
		return;
	}
	if (finalStatus == 'granted') {
		if(Platform.OS==="android")
		{
			Notification.setNotificationChannelAsync("default",{
				name:"default",
				importance:Notification.AndroidImportance.MAX
			})
		}
	}
	token = (await Notification.getExpoPushTokenAsync()).data;
  
	await AsyncStorage.setItem("NotificationToken",`${token}`)
  
  
	alert(await AsyncStorage.getItem("NotificationToken"))
  }








export default function MainMap() {
     
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const[kidsLocations,setKidsLocations]=useState([])//To do add socket.on that changes kids array and show on map


//   const mapRef = useRef();


const id="63738fb9e33a0195e497e318"

	const [cnt, setCnt] = useState(0);
	

	const [ pin, setPin ] = React.useState({
		latitude: 32.07962,
		longitude: 34.88911
	})
  
	const [ region, setRegion ] = React.useState({
		latitude: 32.07962,
		longitude: 34.88911,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})
  const [ baseLocations, setBaseLocations ] = React.useState([])
  const responseListener = useRef();

  useEffect(()=>{
	const id="63738fb9e33a0195e497e318"

socket1.on(`${id}`,  (children) => {
	setCnt(cnt+1)
	
	setKidsLocations([...children.children])
	
	 

	 socket1.emit('disconnect',()=>{
		console.log("user"+socket1.id+" disconnected")
	  })
  })
	
 })
 useEffect(()=> {

    responseListener.current = Notification.addNotificationResponseReceivedListener(response => {
    })
},[])


 useEffect(()=>{
	const id="63738fb9e33a0195e497e318"
		 axios.post(SERVER_URL+"/api-map/users/parent/getChildrenLocation",{id:id})
	.then(data=>{setKidsLocations(data.data)
	setPin({latitude:data.data[0].location[data.data[0].location.length-1].latitude,
		longitude:data.data[0].location[data.data[0].location.length-1].longitude})
	})
 },[])

 	


  useEffect(() => {
    const id="63738fb9e33a0195e497e318"
      axios.post(SERVER_URL+"/api-map/users/parent/getBaseLocations",{id:id})
       
       .then((data) => 
       
        { setBaseLocations(data.data)
         
        }
       ).catch(error => console.log(error));
 }, []); 


 useEffect(() => {
  
	// mapRef.current.animateToRegion({
	// 	latitude: latitude,
	// 	longitude: longitude,
	// 	latitudeDelta: 0.1,
	// 	longitudeDelta: 0.1
	//   })
	  console.log("sss")

 }, [longitude]); 



// function regionChange(child)
// {
// 	setLatitude([child.location[child.location.length-1].latitude])
// 	setLongitude([child.location[child.location.length-1].longitude])
// 	console.log(child.location[child.location.length-1].longitude)
// 	setRegion




// }

function changeRegion(child){
  const latitude = parseFloat(child.location[child.location.length-1].latitude);
  const longitude = parseFloat(child.location[child.location.length-1].longitude);
console.log(longitude+""+longitude)
//   mapRef.current.animateToRegion({
//     latitude,
//     longitude,
//     latitudeDelta: 0.1,
//     longitudeDelta: 0.1
//   })
}






	return (
		<View 	style={styles.container}>
 	{kidsLocations.map((child,index)=>(
		 index==0?<Button title={child.childname?child.childname:""} onPress={()=>changeRegion(child)}/>:""


		 ))} 
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					// key: "AIzaSyDJheGFKSCMaY62ohf_eld0gq171hcY0F4",
          key: "none",
					language: "iw",
					components: "country:il",
					types: "address",
					radius: 100,
					location: `${region.latitude}, ${region.longitude}`
				}}
				// styles={{
				// 	container: { flex: 0, position: "relative", width: "100%", zIndex: 1 },
				// 	listView: { backgroundColor: "white" }
				// }}
       
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
       
        styles={{
           	container: { flex: 0, position: "relative", width: "100%", zIndex: 1},
          textInputContainer: {
            backgroundColor: '#d3d3d3',
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          }
        }}
			/>
       
			<MapView
				style={styles.map}
				initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				// region={{
				// 	latitude: latitude,
				// 	longitude: longitude,
				// 	latitudeDelta: 0.0922,
				// 	longitudeDelta: 0.0421
				// }}
				// ref={mapRef}

				
				provider="google"
			>
	
					


				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>



					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={35} />

       


				{kidsLocations.map((marker, index) => (
					
				marker.location[marker.location.length-1]?	
          <>
    <Marker
      key={index}
      coordinate={{ latitude: parseFloat(marker.location[marker.location.length-1].latitude)
		, longitude: parseFloat(marker.location[marker.location.length-1].longitude) }}
        title={`${marker.location[marker.location.length-1].time+"--"+marker.batteryLevel}`}
    />
    <Circle key ={index+199} center={{ latitude: parseFloat(marker.location[marker.location.length-1].latitude)
		, longitude: parseFloat(marker.location[marker.location.length-1].latitude) }}
         radius={75} />
		
    </>
	:""
  ))}




        {baseLocations.map((marker, index) => (
          <>
    <Marker
      key={index}
      coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
        title={marker.name&&marker.name}
    />
    <Circle key ={index+199} center={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }} radius={75} />

   


    </>
  ))}
        
			</MapView>
      <View style={{ marginTop: 50, flex: 1 ,flexDirection:"column"}}>
      
      <Text> {"mainMap"+cnt}</Text>
	  
      
      </View>
     
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height/2
	},
  inputStyle: {
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height:50,
    width:200

  }
})
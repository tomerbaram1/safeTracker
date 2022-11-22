
import axios from "axios"
import * as React from "react"
import { useEffect } from "react"
import { Dimensions, StyleSheet, Text, View,Button, ScrollView, PermissionsAndroid, Alert } from "react-native"
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



const TASK_FETCH_LOCATION = 'background-location-task';


const SERVER_URL="http://10.195.25.133:4000";



const USERID="63738fb9e33a0195e497e318"




  



export default function AddLocation() {
     
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);



  const[myLocatin,setMyLocation]=useState({
		latitude: 32.07962,
		longitude: 34.88911
	})



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
  const [locationName,setLocationName]=useState("");
  const [initailLocation,setIntialLocation]=useState();

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
//////////////////////register
 



TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
  
  if (error) {
    console.error(error);
    return;
  }
 
  const [location] = locations;
  try {
  
    setPin({latitude:location.coords.latitude,longitude:location.coords.longitude})
    Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
  } catch (err) {
    console.error(err);
  }
});

useEffect(() => {
  Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 1, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 1, // minimum interval (in milliseconds) between updates
   
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    foregroundService: {
      notificationTitle: 'Using your location',
      notificationBody: 'To turn off, go back to the app and switch something off.'
 } })


   
}, []); 





  useEffect(() => {
    const id="63738fb9e33a0195e497e318"
      axios.post(SERVER_URL+"/api-map/users/parent/getBaseLocations",{id:id})
       
       .then((data) => 
       
        { setBaseLocations(data.data)
         
        }
       ).catch(error => console.log(error));

       
       (async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude);
        setLocation(location.coords);
      })();
   




 }, []); 




  const handleAddPlace=()=>{
    const id="63738fb9e33a0195e497e318"
    const obj={latitude:pin.latitude,longitude:pin.longitude,name:locationName}

  let newLocationsBaseArray=[...baseLocations];
  newLocationsBaseArray.push(obj)
  console.log(locationName)
  newLocationsBaseArray[newLocationsBaseArray.length-1].locationName=locationName;
  
 
  setBaseLocations(newLocationsBaseArray)
   axios.patch(SERVER_URL+"/api-map/users/parent/addBaseLocations",{id:id,newLocationsBaseArray:newLocationsBaseArray})
  .then(data=>console.log(data+"sss")) .catch(error => console.log(error));

 }





	return (
		<View 	style={styles.container}>
  
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
     
       {
       Longitude?
     	<MapView
				style={styles.map}
				initialRegion={{
          latitude: Latitude,
          longitude: Longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
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
						<Text>Drag to new location</Text>
					</Callout>
				</Marker>
				{/* <Circle center={pin} radius={35} /> */}

       


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
     :"" }
      <View style={{ marginTop: 50, flex: 1 ,flexDirection:"column"}}>
      <TextInput value={locationName}onChangeText={(input) =>  setLocationName(`${input}`)} style={styles.inputStyle}/>
        <Button title="add place" onPress={()=>handleAddPlace()}/>
      <Text> {"lat:" + initailLocation?.coords.longitude+ " long :"+" text-"}</Text>
   
      
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
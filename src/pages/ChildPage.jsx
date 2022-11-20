import { Text, View, StyleSheet, Pressable, Touchable } from "react-native";

import axios from "axios";
import * as React from "react";
import { useEffect } from "react";

import { useState } from "react";
// import Geolocation from 'react-native-geolocation-service';
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { AsyncStorage } from "react-native";

// import * as Permissions from 'expo-permissions';

import { useSelector } from "react-redux";

const TASK_FETCH_LOCATION = "background-location-task";
const SERVER_URL = "http://10.195.25.143:4000";
const USERID = "63738fb9e33a0195e497e318";

const ChildPage = ({ sos, setSos }) => {

  const [sosMsg, setSosMsg] = useState(false);

  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      registerForPushNotificationsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }
    })();
  }, []);

  useEffect(() => {
    console.log("notification");
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 1, // minimum interval (in milliseconds) between updates

      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  }, []);

  TaskManager.defineTask(
    TASK_FETCH_LOCATION,
    async ({ data: { locations }, error }) => {
      const id = "63738fb9e33a0195e497e318";
      const token = await AsyncStorage.getItem("NotificationToken");
      console.log(token, "**********************");
      if (error) {
        console.error(error);
        return;
      }

      const [location] = locations;
      console.log(location, "location");

      try {
        axios.patch(SERVER_URL + "/api-map/users/parent/addChildrenLocation", {
          id: id,
          connectionToken: "c8b682c1-cb6b",
          currentLocation: location,
          token: "ExponentPushToken[Uh8EfSGwGP2wOYky3ImWmQ]",
        });
        console.log(location.coords.latitude);
      } catch (err) {
        console.error(err);
      }
    }
  );

  const longhandle = () => {
    alert(`${user.fullName} SOS called!`);
    setSosMsg(false);
    setSos(true);
  };

  const pressIn = () => {
    setSosMsg(true);
  };

  const pressOut = () => {
    setSosMsg(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.trackBtn}>
        <Text style={styles.trackText}>START</Text>
      </Pressable>

      <Pressable
        style={sosMsg ? styles.sosBtnActive : styles.sosBtn}
        delayLongPress={3000}
        onLongPress={longhandle}
        onPressIn={pressIn}
        onPressOut={pressOut}>
        <Text style={styles.sosText}>S O S</Text>
      </Pressable>
      {sosMsg && <Text style={styles.sosMsg}>Hold for 3 seconds</Text>}
    </View>
  );
};

export default ChildPage;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  trackBtn: {
    height: 200,
    width: 200,
    backgroundColor: "#577399",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 200,
  },
  trackText: {
    color: "white",
    fontWeight: "800",
    fontSize: 35,
    textAlign: "center",
  },
  sosBtn: {
    backgroundColor: "#D51807",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 15,
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 90,
  },

  sosText: {
    color: "white",
    fontWeight: "800",
  },
  sosMsg: {
    marginTop: 100,
    textAlign: "center",
  },
  sosBtnActive: {
    backgroundColor: "#D51807",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 90,
    padding: 20,
    borderColor: "#c91100",
    borderWidth: 4,
  },
});

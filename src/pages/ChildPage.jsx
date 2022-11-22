import { Text, View, StyleSheet, Pressable, Touchable } from "react-native";

import axios from "axios";
import * as React from "react";
import { useEffect } from "react";


import { useState } from "react";
// import Geolocation from 'react-native-geolocation-service';
import * as Location from "expo-location";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";
import { AsyncStorage } from "react-native";
import * as Notification from "expo-notifications";
// import * as Permissions from 'expo-permissions';
import { useRef } from "react";
import * as Application from "expo-application";
import IO from "socket.io-client";
import * as Battery from "expo-battery";
import { useSelector } from "react-redux";


const LOCATION_TASK_NAME = 'background-location-task';



const SERVER_URL = "http://10.195.25.133:4000";
const USERID = "63738fb9e33a0195e497e318";

async function sendBatteryUpdate() {
  const batteryLevel = Math.ceil((await Battery.getBatteryLevelAsync()) * 100);
  return batteryLevel;
}

const ChildPage = () => {
  const { user } = useSelector((state) => state.auth);

  const [sosMsg, setSosMsg] = useState(false);
  const [sos, setSos] = useState(false);
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
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        startLocation();
      }
    })();
  }, []);

  async function startLocation() {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 5, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 100, // minimum interval (in milliseconds) between updates

      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  }

  const [region, setRegion] = React.useState({
    latitude: 32.07962,
    longitude: 34.88911,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  TaskManager.defineTask(
    LOCATION_TASK_NAME,
    async ({ data: { locations }, error }) => {
      const id = "63738fb9e33a0195e497e318";
      const [location] = locations;
      const batteryLevel = await sendBatteryUpdate();

      console.log(batteryLevel, "battery");
      try {
        await axios.patch(
          SERVER_URL + "/api-map/users/parent/addChildrenLocation",
          {
            id: id,
            connectionToken: "c8d682c1-cd6b",
            currentLocation: location,
            token: "ExponentPushToken[Uh8EfSGwGP2wOYky3ImWmQ]",
            batteryLevel: batteryLevel,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  );

  return (
    <View>

      <Pressable
        style={sosMsg ? styles.sosBtnActive : styles.sosBtn}
        delayLongPress={3000}
        onLongPress={longhandle}
        onPressIn={pressIn}
        onPressOut={pressOut}>
        <Text style={styles.sosText}>S O S</Text>
      </Pressable>
      {sosMsg && <Text style={styles.sosMsg}>Hold for 3 seconds</Text>}
      {/* MESSAGES */}

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

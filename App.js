import { useContext, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

// redux
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

//components
import EntryScreen from "./src/pages/EntryScreen";

//navigations:

import { NavigationContainer, DarkTheme } from "@react-navigation/native";

//bottom navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

//stack

import * as Battery from 'expo-battery';
import axios from 'axios';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from 'react-native-toast-message';
import Content from "./src/pages/Content";

const Stack = createNativeStackNavigator();

const SERVER_URL="http://172.20.10.4:4000";
const USERID="63738fb9e33a0195e497e318"
const CONNECTION_TOKEN="c8b682c1-cb6b"/// To do- tomer change dynamicaly
const PARENT_ID="63738fb9e33a0195e497e318"/// To do- tomer change dynamicaly








// useEffect(() => {
//   return () => {
//     console.log("ss1")
//     axios.post(
//       SERVER_URL+"/api-map/childClosedApp",{id:PARENT_ID,
//       connectionToken:CONNECTION_TOKEN,
//       batteryLevel:Math.ceil(Battery.getBatteryLevelAsync()*100)
//   })
//   };
// })


export default function App() {
  return (
    <Provider store={store}>

      <NavigationContainer>

        <EntryScreen />
        <Toast/>
        

      </NavigationContainer>
    </Provider>
  );
}


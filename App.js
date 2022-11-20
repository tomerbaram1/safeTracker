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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
      // theme={DarkTheme}
      >
        <EntryScreen />
        <Toast/>
      </NavigationContainer>
    </Provider>
  );
}


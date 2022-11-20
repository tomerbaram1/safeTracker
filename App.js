import { useContext, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';


// redux
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
// redux-persist wrappers

// import { persistStore, persistReducer } from 'redux-persist'// the local storage we'll be using to persist data
// import AsyncStorage from '@react-native-community/async-storage'// redux-persist merge level
// import autoMergeLevel2 from 'redux persist/lib/stateReconciler/autoMergeLevel2'// root reducer - reducers/index.js
// import { PersistGate } from 'redux-persist/lib/integration/react';


//components
import EntryScreen from './src/pages/EntryScreen';

//navigations: 

import { NavigationContainer, DarkTheme } from '@react-navigation/native';


//bottom navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Content from './src/pages/Content';
import { useEffect } from 'react';
import * as Battery from 'expo-battery';
import axios from 'axios';


const Stack = createNativeStackNavigator();
const SERVER_URL="http://10.0.0.11:4000";
const USERID="63738fb9e33a0195e497e318"
const CONNECTION_TOKEN="c8b682c1-cb6b"/// To do- tomer change dynamicaly
const PARENT_ID="63738fb9e33a0195e497e318"/// To do- tomer change dynamicaly


// // redux persist
// // persist config
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   stateReconciler: autoMergeLevel2
// };// wrap persist API around root reducer and store
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);







// import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {





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

  return(


     <Provider store={store}>
      <NavigationContainer
        // theme={DarkTheme}
      >

        <Content/>

      </NavigationContainer>
     </Provider>


  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     marginTop: 50,
//     color: '#16213E',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15
//   },

// });




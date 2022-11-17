
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
const Stack = createNativeStackNavigator();

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
import { useState } from 'react';


export default function App() {
  const [sos, setSos] = useState(false)

  return(


     <Provider store={store}>
      <NavigationContainer
        // theme={DarkTheme}
      >

        <EntryScreen/>

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





import { useContext, useState } from 'react';

//react native
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
import WelcomePage from './src/pages/WelcomePage';
import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';
import Chat from './src/pages/Chat';
import Settings from './src/pages/settings/Settings'
import ParentPage from './src/pages/ParentPage';



//navigations: 
import { NavigationContainer } from '@react-navigation/native';

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



const Content = () => {


  return (


    <Tab.Navigator>
      <Tab.Screen name="ParentPage" component={ParentPage} options={{headerShown:false}}/>
      <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
      <Tab.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

export default function App() {

  return(

    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
          <Stack.Screen name="Content" component={Content} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      {/* </PersistGate> */}
      </Provider>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginTop: 50,
    color: '#16213E',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },

});

  




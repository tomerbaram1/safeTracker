
import { useState } from 'react';

//react native
import { StyleSheet, Text, View } from 'react-native';


//components
import WelcomePage from './src/pages/WelcomePage';
import SignUp from './src/pages/SignUp';

import ParentHomePage from './src/pages/ParentPage';
import ChildHomePage from './src/pages/ChildPage';

import Notification from './src/pages/NotificationsScreen';
import Chat from './src/pages/Chat';
import AddLocation from './src/pages/AddLocation';
import Settings from './src/pages/settings/Settings'

//navigations: 
import { NavigationContainer } from '@react-navigation/native';

//bottom navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//use navigate
// import { useNavigation } from '@react-navigation/native';
// const navigation = useNavigation();
// need to uninstall this package

import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {


  const [isSignedIn, setIsSignedIn] = useState(true)

  {if (isSignedIn == true) {
    return (
      <NavigationContainer styles={styles.container}>
        <PaperProvider>
          <Tab.Navigator>
            <Tab.Screen name="ParentHomePage" component={ParentHomePage}/>
            <Tab.Screen name="Notification" component={Notification}/>
            <Tab.Screen name="AddLocation" component={AddLocation}/>
            <Tab.Screen name="Chat" component={Chat}/>
            <Tab.Screen name="Settings" component={Settings}/>
          </Tab.Navigator>
        </PaperProvider>

      </NavigationContainer>
      )} else {
          return (
            <NavigationContainer styles={styles.container}>
              <Stack.Navigator>
                <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
              </Stack.Navigator>
            </NavigationContainer>
          )}
    }

  return (

    <NavigationContainer styles={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="ParentHomePage" component={ParentHomePage}/>
        <Tab.Screen name="Notification" component={Notification}/>
        <Tab.Screen name="AddLocation" component={AddLocation}/>
        <Tab.Screen name="Chat" component={Chat}/>
        <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  </NavigationContainer>
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

  
{/* <NavigationContainer styles={styles.container}>

{islogged ? (

   <Tab.Navigator>
      <Tab.Screen name="ParentHomePage" component={ParentHomePage}/>
      <Tab.Screen name="Notification" component={Notification}/>
      <Tab.Screen name="AddLocation" component={AddLocation}/>
      <Tab.Screen name="Chat" component={Chat}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  
  ) :
      
  <WelcomePage />

}

</NavigationContainer> */}


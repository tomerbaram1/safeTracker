//react native
import { StyleSheet, Text, View } from 'react-native';

//components
import WelcomePage from './src/pages/WelcomePage';
import SignUp from './src/pages/SignUp';
import SignIn from './src/pages/SignIn';

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



export default function App() {

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
});

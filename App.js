
import { useContext, useState } from 'react';

//react native
import { StyleSheet, Text, View } from 'react-native';


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
const Stack = createNativeStackNavigator();



import { Provider as PaperProvider } from 'react-native-paper';
import { AuthContext, AuthProvider } from './src/Context/AuthContext';

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

    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
          <Stack.Screen name="Content" component={Content} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
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

  




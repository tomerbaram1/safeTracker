import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from './settings/Settings';
import Chat from './Chat';

const Tab = createBottomTabNavigator();

const ParentPage = () => (
  <Tab.Navigator>
    <Tab.Screen name="ParentPage" component={ParentPage} options={{headerShown:false}}/>
    <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
    <Tab.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
  </Tab.Navigator>
);

export default ParentPage;

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
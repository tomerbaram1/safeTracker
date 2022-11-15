import * as React from 'react';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import ParentPage from './ParentPage';
import Settings from './settings/Settings';

const Tab = createBottomTabNavigator();

const HomeContent = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="ParentPage" component={ParentPage} options={{headerShown:false}}/>
            <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
            <Tab.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
         </Tab.Navigator>
        )
}

export default HomeContent;
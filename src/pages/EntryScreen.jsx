//react
// import { useState } from 'react';

//navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//components

import WelcomePage from './WelcomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Content from './Content';

const EntryScreen = () => {

    // const [User, setUser] = useState(false)
                            
    return (
        // <Stack.Navigator>
        //     { (User) ?
        //         (    
        //             <Stack.Screen name="Content" component={Content} options={{headerShown:false}}/>  
        //         ) :
        //         (
        //             <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
        //             <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        //             <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>  
        //         )
        //     }
        // </Stack.Navigator>

        <Stack.Navigator>
            <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown:false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>  
            <Stack.Screen name="Content" component={Content} options={{headerShown:false}}/>  
        </Stack.Navigator>
        
        )
    }

export default EntryScreen;
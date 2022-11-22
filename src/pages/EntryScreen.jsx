//navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

//components

import WelcomePage from "./WelcomePage";
import SignIn from "./SignIn";
import SignInChild from "../child/SignInChild";
import SignUp from "./SignUp";
import Content from "./Content";
import { useSelector } from "react-redux";
import { useState } from "react";
const EntryScreen = () => {
  const [isChild,setIsChild] = useState(false)

  const SignInChildPage = props =>  { return (<SignInChild  {...props} isChild={isChild} setIsChild={setIsChild} />)}
  const ContentPage = props =>  { return (<Content  {...props} isChild={isChild} setIsChild={setIsChild}/>)}

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignInChild"
          component={SignInChildPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Content"
          component={ContentPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default EntryScreen;

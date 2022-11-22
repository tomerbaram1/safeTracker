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
const EntryScreen = () => {
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
          component={SignInChild}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default EntryScreen;

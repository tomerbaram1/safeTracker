//navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

//components
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import ParentPage from "./ParentPage";
import Settings from "./settings/Settings";
import ChildPage from "./ChildPage";
import MainMap from "./MainMap";
import AddLocation from "./AddLocation";

import AddChild from "./AddChild";
import { useState } from "react";
import ChildList from "./ChildList";
// import Cloudinary from './Cloudinary';
import Chat from "./Chat";

const Content = ({ isChild, setIsChild }) => {
  const [sos, setSos] = useState(false);

  // const [childNumber, setChildNumber] = useState("");

  const ChildpageComp = (props) => {
    return <ChildPage {...props} sos={sos} setSos={setSos} />;
  };
  const ParentpageComp = (props) => {
    return (
      <ParentPage
        {...props}
        sos={sos}
        setSos={setSos}
        // childNumber={childNumber}
        // setChildNumber={setChildNumber}
      />
    );
  };

  return (
    <>
      {isChild ? (
        <Tab.Navigator>
          <Tab.Screen
            name="ChildPage"
            component={ChildpageComp}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="ParentPage"
            component={ParentpageComp}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name="AddLocation"
            component={AddLocation}
            options={{ headerShown: false }}

            
            
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export default Content;

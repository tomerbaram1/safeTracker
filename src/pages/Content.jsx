//navigation 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//components
import ParentPage from "./ParentPage";
import Settings from "./settings/Settings";
import Chat from "./Chat";
import ChildHomePage from './ChildPage';
import MainMap from './MainMap';
import AddLocation from './AddLocation';

const Content = () => {

    return (
  
      <Tab.Navigator>
        <Tab.Screen name="ParentPage" component={ParentPage} options={{headerShown:false}}/>
        <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
        <Tab.Screen name="ChildHomePage" component={ChildHomePage} options={{headerShown:false}}/>
        <Tab.Screen name="MainMap" component={MainMap} options={{headerShown:false}}/>
        <Tab.Screen name="AddLocation" component={AddLocation} options={{headerShown:false}}/>
      </Tab.Navigator>
  
    )
  }

  export default Content;
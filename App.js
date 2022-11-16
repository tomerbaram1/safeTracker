//react native 
import { StyleSheet, Text, View } from 'react-native';

//components
import EntryScreen from './src/pages/EntryScreen';

//navigations: 
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

// import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/Context/UserContext';

export default function App() {

  return(

    <AuthProvider>
      <NavigationContainer
        // theme={DarkTheme}
      >

        <EntryScreen/>

      </NavigationContainer>
    </AuthProvider>

  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   title: {
//     marginTop: 50,
//     color: '#16213E',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15
//   },

// });



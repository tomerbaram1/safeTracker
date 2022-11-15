import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ChildPage from './src/pages/ChildPage';
import WelcomePage from './src/pages/WelcomePage';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>

      {/* <Text>Safe Tracker!</Text> */}
      {/* <StatusBar style="auto" />  */}
      {/* <WelcomePage/> */}
      <ChildPage/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

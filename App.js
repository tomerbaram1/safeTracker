// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ChildPage from './src/pages/ChildPage';
import ParentPage from './src/pages/ParentPage';


export default function App() {
  const [sos, setSos] = useState(false)

  return (
    <View style={styles.container}>
      <ScrollView>
      <ChildPage sos={sos} setSos={setSos}/>
      <ParentPage sos={sos} setSos={setSos}/>
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
  }
});

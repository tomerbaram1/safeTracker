import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SMS from 'expo-sms';
import { async } from '@firebase/util';
// import * as Print from 'expo-print';
// import * as FileSystem from 'expo-file-system';

import { useSelector } from "react-redux";
import { Message } from 'react-native-gifted-chat';


export default function App() {

    const [isAvailable, setIsAvailable] = useState(true)
    const { user } = useSelector((state) => state.auth);

    useEffect( async () => {
        const isSmsAvailable = await SMS.isAvailableAsync();
        setIsAvailable(isAvailable);
    },[])

    const sendSms = async () => {
        const {result} = await SMS.sendSMSAsync(
            [user.phoneNumber],
            'test'
        );

        console.log(result)
    }

  return (
    <View style={styles.container}>
    {isAvailable ? 
        <Button title='Sens Sms' onPress={sendSms}/> : 
        <Text>No sms Available</Text>
    }
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
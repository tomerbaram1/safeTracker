import React from "react";
import { Text, View, Button, Linking } from "react-native";

import { useSelector } from "react-redux";


const Chat = () => {

  const { user } = useSelector((state) => state.auth);
  const number = '0548181991'

  return(

  <View>
    <Text>Chat</Text>
    <Button title="whatsapp" onPress={() => Linking.openURL('https://wa.me/0548181991')}/>
    <Button title="whatsapp" onPress={() => Linking.openURL('https://wa.me/0548181991')}/>
    <Button title="whatsapp" onPress={() => Linking.openURL('https://wa.me/0548181991')}/>
    <Button title="whatsapp" onPress={() => Linking.openURL('https://wa.me/972503939008')}/>
    <Button title="whatsapp" onPress={() => Linking.openURL('https://wa.me/972548181991')}/>
    <Button title="whatsapp" onPress={() => Linking.openURL(`https://wa.me/972${(number).slice(1,10)}`)}/>
    <Button title="whatsapp" onPress={() => Linking.openURL(`https://wa.me/972${(user.children.phone).slice(1,10)}`)}/>
  </View>
  )
}

export default Chat;

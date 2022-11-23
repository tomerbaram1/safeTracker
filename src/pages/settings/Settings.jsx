import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, View, Switch, StyleSheet} from 'react-native';
import { Button, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../redux/AuthSlice';

const Settings = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    console.log(user.fullName, "logging out");
    dispatch(logout())
      .then(navigation.navigate("WelcomePage"))
      .catch((error) => console.log(error));
    dispatch(reset());
  };
  return(
  <List.AccordionGroup>
    <List.Accordion title="Add Kid" id="2">
      <List.Item title="Item 2" />
    </List.Accordion>
    <List.Accordion title="Log Out" id="1">
    <List.Item title="Log Out" />
        <Button styles={styles.logoutBtn} title="Log Out" onPress={onLogout} />
    </List.Accordion>
    <View>
      {/* <Text>
        List.Accordion can be wrapped because implementation uses React.Context.
      </Text> */}
      <List.Accordion title="Terms Of Use" id="3">
        <List.Item title="Item 3" />
      </List.Accordion>
      <View>
      <Switch
          // onValueChange = {handlerHere}
          // value = {Pre decided value if any}
        />
      </View>
    </View>
  </List.AccordionGroup>

  )
}


export default Settings;
const styles = StyleSheet.create({
  text: {
    marginTop: 100,
    textAlign: "center",
  },
  SosCall: {
    backgroundColor: "#D51807",
    textAlign: "center",
    padding: 5,
    color: "white",
    fontWeight: "700",
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 50,
    color: "#16213E",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

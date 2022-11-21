import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Input } from "@rneui/themed";
import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { List, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../redux/AuthSlice";

const Settings = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState("java");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    console.log(user?.fullName, "logging out");
    dispatch(logout())
      .then(navigation.navigate("WelcomePage"))
      .catch((error) => console.log(error));
    dispatch(reset());
  };

  return (
    <View>
      <View style={styles.setView}>
        <Text style={styles.setViewText}>
          <Icon name="gear" type="font-awesome" size={30} />
          Settings
        </Text>
      </View>
      <List.AccordionGroup>
        <List.Accordion
          title="Add Kid"
          id="2"
          left={(props) => (
            <List.Icon {...props} icon="account-child-outline" />
          )}
        >
          <List.Item title="Change location refresh frequency" />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 50,
            }}
          >
            <Text>Refresh after</Text>
            <TextInput
              defaultValue="10"
              style={{ width: "16%", textAlign: "center" }}
              keyboardType="phone-pad"
            />
            <Text>meters</Text>
          </View>
        </List.Accordion>
        <List.Accordion
          title="Account"
          id="1"
          left={(props) => <List.Icon {...props} icon="account" />}
        >
          <Button title="Log Out" onPress={onLogout} />
        </List.Accordion>
        <View>
          <List.Accordion
            title="Privacy"
            id="3"
            left={(props) => <List.Icon {...props} icon="lock" />}
          >
            <List.Item title="Terms of Use" />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              tellus elementum sagittis vitae. Blandit cursus risus at ultrices
              mi tempus imperdiet nulla malesuada. Sed egestas egestas fringilla
              phasellus. Nullam eget felis eget nunc. Convallis aenean et tortor
              at risus viverra adipiscing at. Feugiat nisl pretium fusce id
              velit ut tortor pretium viverra. Suscipit adipiscing bibendum est
              ultricies integer quis auctor elit. Elit pellentesque habitant
              morbi tristique senectus. Porta lorem mollis aliquam ut porttitor
              leo a. Ut tortor pretium viverra suspendisse. Egestas quis ipsum
              suspendisse ultrices gravida. Arcu cursus vitae congue mauris
              rhoncus aenean. Mi proin sed libero enim sed faucibus turpis in
              eu. At consectetur lorem donec massa sapien faucibus et molestie.
              Accumsan tortor posuere ac ut consequat semper viverra.
            </Text>
          </List.Accordion>
        </View>
      </List.AccordionGroup>
      <View style={{marginTop:10, backgroundColor:'white'}}>
        <Button title="Log Out" onPress={onLogout} color="red" />
      </View>
    </View>
  );
};


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
  setView: {
    margin: 50,
    marginTop: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  setViewText: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },

});

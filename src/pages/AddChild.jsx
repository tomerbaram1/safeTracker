import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Button,
  TouchableWithoutFeedback,
  Overlay,
  Modal,
  Dimensions
} from "react-native";
import axios from "axios";
import { Input } from "@rneui/base";

const api = axios.create({ baseURL: "http://172.20.10.3:4000" });

const AddChild = () => {
  const [childName, setChildName] = useState("");
  const [childPhone, setChildPhone] = useState("");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);

  const addChild = () => {
    api
      .patch(`/api/addchild`, {
        id: "63762454c7a485ff6f51f811",
        childName: childName,
        childPhone: childPhone,
      })
      .then((res) => {
        const gettoken = res.data;
        setToken(gettoken[gettoken.length - 1].connectionToken);
      })
      .catch((error) => console.log(error));
  };

  const submit = (e) => {
    e.preventDefault();
    addChild();
    setShowToken(!showToken);
  };

  return (
    <View>
      <Text style={styles.addchild}>Add Your Child</Text>

      <TextInput
        style={styles.input}
        placeholder="Child's Name"
        onChangeText={(e) => setChildName(e)}
        value={childName}
      />
      <TextInput
        style={styles.input}
        placeholder="Child's Phone Number"
        keyboardType="phone-pad"
        onChangeText={(e) => setChildPhone(e)}
        value={childPhone}
      />
      <Button
       onPress={submit}
       title="Add" 
       color='#495867'/>
      {showToken && (
        <View style={styles.overlay}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={true}
            style={styles.modal}
          >
            <Text style={styles.overlayText}>Your Child's Token</Text>
            <Text selectable={true} style={styles.overlayToken}>
              {token}
            </Text>
            <Button title="close" onPress={() => setShowToken(!showToken)} />
          </Modal>
        </View>
      )}
    </View>
  );
};

export default AddChild;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    width: Dimensions.get("window").width- 15,
  },
  addchild: {
    textAlign: "center",
    marginTop:15
  },
  genBtn: {
    textAlign: "center",
    backgroundColor: "lightgray",
  },
  addBtn: {
    fontWeight: "900",
  },
  overlayText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
    marginTop: 100,
  },
  overlayToken: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  modal: {
    height: 20,
  },
});

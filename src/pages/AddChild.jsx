
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Modal,
  Dimensions
} from "react-native";
import axios from "axios";
import { Input } from "@rneui/base";
import { useSelector } from "react-redux";


const api = axios.create({ baseURL: "http://10.195.25.155:4000" });

const AddChild = () => {

  const [childname, setChildName] = useState("");
  const [phone, setChildPhone] = useState("");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const id = user?._id;

  const addChild = () => {
    api
      .patch(`/api/addchild/${id}`, {
        childname: childname,
        phone: phone,
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
        value={childname}
      />
      <TextInput
        style={styles.input}
        placeholder="Child's Phone Number"
        keyboardType="phone-pad"
        onChangeText={(e) => setChildPhone(e)}
        value={phone}
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
            style={styles.modal}>
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

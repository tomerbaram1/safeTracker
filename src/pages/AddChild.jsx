import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Modal,
  Dimensions
} from "react-native";
import axios from "axios";
import { Input } from "@rneui/base";
import { useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker'
// let url;

const api = axios.create({ baseURL: "http://10.195.25.107:4000" });
let imageURL;
const AddChild = () => {

  const [childname, setChildName] = useState("");
  const [phone, setChildPhone] = useState("");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!data.canceled) {
        let newFile = { 
            uri:data.uri, 
            type:`trackerApp/${data.uri.split('.')[1]}`, 
            name: `trackerApp/${data.uri.split('.')[1]}` }
        handleUpload(newFile)
    }
  };

  const handleUpload = async (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'trackerApp')
    console.log(data);

   await axios.post('https://api.cloudinary.com/v1_1/dsk7a1p4y/image/upload', data)
    .then(res => setImage(res.data.secure_url))
    
  }

  const id = user?._id;

  const addChild = (image) => {
    api
      .patch(`/api/addchild/${id}`, {
        childname: childname,
        phone: phone,
        image: image

      })
      .then((res) => {
        const gettoken = res.data;
        setToken(gettoken[gettoken.length - 1].connectionToken);
      })
      .catch((error) => console.log(error));
  };

  const submit = (e) => {
    e.preventDefault();
    addChild(image);
    setShowToken(!showToken);
  };


  useEffect(() => {
console.log(image + '----------------------------useEFFECT-------------------->>>>>>>>>')

  }, [])

  return (
    <View>

      <Text style={styles.addchild}>Add Your Child</Text>

      {image ? <Button
       onPress={submit}
       title="Add" 
       color='#495867'/> : "" }
      
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
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
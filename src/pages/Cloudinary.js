import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';

export default function Cloudinary() {
  const [image, setImage] = useState(null);

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

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'trackerApp')
    console.log(data);

    axios.post('https://api.cloudinary.com/v1_1/dsk7a1p4y/image/upload', data)
    .then(res => console.log(res.data.secure_url))
  }



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
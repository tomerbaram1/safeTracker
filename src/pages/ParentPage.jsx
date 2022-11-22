

import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Linking, ScrollView, Pressable, ScrollViewComponent} from 'react-native';
import { Button, FAB } from "@rneui/base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../redux/AuthSlice';
import MainMap from './MainMap';
import ChildList from './ChildList';
import AddChild from './AddChild';
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

const ParentPage = ({ navigate, sos, setSos, childNumber, setChildNumber } ) => {
  const [infoDown, setInfoDown] = useState(false)
  const [addChildForm, setAddChildForm] = useState(false)
  
  const { user } = useSelector((state) => state.auth);
  


  const navigation = useNavigation();

  const dispatch = useDispatch();
 
  useEffect(() => {
    if (!user) {
      navigation.navigate("WelcomePage");
    }
  }, [user]);


  return(
  <View>
    <Text>
      {user?.fullName}
    </Text>
    <Text>
    {user?.fullName}
    </Text>
   
    {sos && (
      <View style={styles.SosCall}>
       <Text style={styles.SosCall}>
        SOS call from your child!
      </Text>
      <Button color={'black'} onPress={() => Linking.openURL(`tel: ${childNumber}`)} title='Call Your Child'/>
      <Button color={'black'} onPress={() => Linking.openURL('tel: 0525848456')} title='Call The Police'/>
      <Button color={'black'} onPress={() => setSos(false)} title='Close'/>
      </View>
    )}
    <View style={styles.mapView}>
      <MainMap/>
      <View style={{ flex: 1 }}>
      </View>
    </View>
    <View style={!infoDown ? styles.infoView : styles.infoViewDown}>
      <Pressable style={styles.downBtn} onPress={() => setInfoDown(!infoDown)}>
        <Text style={{color:'white', fontSize:20, fontWeight:'200', marginTop:10}}>
        =
        </Text>
      </Pressable>
      <View>
        <FAB
        icon={{ name: !addChildForm? 'add' : 'close', color: 'white' }}
        color='#495867'
        style={{marginTop:-30, marginBottom:10}}
        onPress={() => setAddChildForm(!addChildForm)}
      />
        {addChildForm && (
          <AddChild/>
        )}
      </View>
    <ChildList childNumber={childNumber} setChildNumber = {setChildNumber} />
    </View>
    
  </View>

  )}

export default ParentPage;

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
  mapView: {
    height:'100%',
    marginTop:200
  },
  infoView:{
    backgroundColor:'white',
    position:'absolute',
    bottom:'-130%',
    width:'100%',
    height:'195%',
    borderRadius:50,
    overflow:'scroll',
    display:'flex',
    alignItems:'center',
  },
  infoViewDown:{
    backgroundColor:'white',
    position:'absolute',
    bottom:'-140%',
    width:'100%',
    height:'170%',
    borderRadius:50,
    overflow:'scroll',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    display:'flex',
    alignItems:'center',
  },
  downBtn:{
    margin:10,
    backgroundColor:'lightgray',
    padding:10,
    borderRadius:100,
    top:-35,
    paddingHorizontal:30,
    color:'white'
  }
});

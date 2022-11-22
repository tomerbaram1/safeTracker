import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import { FAB, Icon, Tooltip } from "@rneui/base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const api = axios.create({ baseURL: "http://172.20.10.4:4000" });

const ChildList = ({ childNumber, setChildNumber }) => {
  const [kids, setKids] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const id = user?._id;
  const getKidsData = () => {
    console.log(id+" user's id")
    api
      .post('/api/addchild',{id:id})
      
      .then((res) => {
        console.log(id,"id after get")
        const data = res.data;
        setKids(data.children);
        console.log(data.children,"kids");

      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getKidsData();
  }, []);

  return (
    <View style={styles.listView}>
      <ScrollView>
        {kids?kids.map((data, index) => {
          if (kids.length == 0) {
            return <Text>no kids registerd</Text>;
          }
          return (
            <View key={index} style={styles.kidView}>
              <Text style={styles.kidName}>
                <Icon
                  style={{ marginRight: 15 }}
                  name="child"
                  type="font-awesome"
                  size={30}
                />
                {data.childname || data.childName}
              </Text>
              <Text style={{ fontWeight: "700" }}>
                <Icon
                  style={{ marginRight: 15 }}
                  type="font-awesome"
                  name="phone"
                />
                {data.phone || data.childPhone}
                {setChildNumber(data.phone)}
              </Text>
              <Text style={{ fontWeight: "700" }}>
                <Icon
                  style={{ marginRight: 10 }}
                  type="font-awesome"
                  name="key"
                />
                {data.connectionToken}
              </Text>
              <View style={styles.battery}>
                <Text>
                  <Icon
                    style={styles.batteryIcon}
                    name="battery"
                    type="font-awesome"
                    size={15}
                  />
                  {data.batteryLevel}%
                </Text>
              </View>
              <FAB
                icon={{ name: "message", color: "white" }}
                color="#495867"
                style={!openHistory ? styles.msg : styles.msgTwo}
              />
              <FAB
                title="Location History"
                icon={{ name: "place", color: "white" }}
                color="#495867"
                style={{ marginTop: 15, marginRight: 150 }}
                onPress={() => setOpenHistory(!openHistory)}
              />
              {openHistory && (
                <ScrollView horizontal={true}>
                  <View>
                    <Text>
                      {data.events.map((loc, index) => {
                        return (
                          <View style={styles.locationList} key={index}>
                            <Text>
                              {new Date(loc.time * 1000)
                                .toLocaleString()
                                .slice(12, 17)}
                            </Text>
                            <Text style={{ fontWeight: "700" }}>
                              {loc.event}
                            </Text>
                          </View>
                        );
                      })}
                    </Text>
                  </View>
                </ScrollView>
              )}
            </View>
          );
        }):""}
      </ScrollView>
    </View>
  );
};

export default ChildList;

const styles = StyleSheet.create({
  kidView: {
    backgroundColor: "#9fbad6",
    width: Dimensions.get("window").width - 15,
    height: "auto",
    minHeight: 210,
    padding: 30,
    borderRadius: 20,
    margin: 5,
    overflow: "scroll",
  },
  kidName: {
    fontSize: 20,
    fontWeight: "900",
  },
  battery: {
    top: 10,
    right: 10,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  },
  locationList: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
  },
  msg: {
    position: "absolute",
    bottom: 28,
    right: 20,
  },
  msgTwo: {
    position: "absolute",
    bottom: 83,
    right: 20,
  },
});

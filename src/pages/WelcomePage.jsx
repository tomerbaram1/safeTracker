
import React from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const WelcomePage = ({ navigation: { navigate } }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <View>
      <View style={styles.imgView}>
        <Image
          source={require("../../assets/googlemap.png")}
          style={styles.img}
        />
      </View>

      <Text style={styles.safe}>
        Safe<Text style={styles.tracker}>Tracker</Text>
      </Text>
      <Pressable
        onPress={() => {
          navigate("SignUp");
        }}
        style={styles.signupBtn}>
        <Text style={styles.signupText}>Sign Up</Text>
      </Pressable>
      <Pressable
        style={styles.signinBtn}
        onPress={() => {
          navigate("SignIn");
        }}>
        <Text style={styles.signinText}>Sign In</Text>
      </Pressable>
      <Pressable
        style={styles.signinBtn}
        onPress={() => {
          navigate("SignInChild");
        }}>
        <Text style={styles.signinText}>Sign In As A Child</Text>
      </Pressable>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  imgView: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    overflow: "hidden",
  },
  img: {
    height: 600,
    width: 420,
    top: -100,
    position: "relative",
    borderRadius: 50,
  },
  safe: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "700",
    color: "#495867",
  },
  tracker: {
    color: "#577399",
    fontWeight: "100",
  },
  signupBtn: {
    backgroundColor: "#577399",
    padding: 10,
    marginBottom: 10,
    width: 200,
    borderRadius: 100,
    left: 110,
    position: "relative",
    shadowColor: "#577399",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  signupText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
  },
  signinBtn: {
    backgroundColor: "#495867",
    padding: 10,
    marginBottom: 10,
    width: 200,
    borderRadius: 100,
    left: 110,
    position: "relative",
    shadowColor: "#495867",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  signinText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
  },
});

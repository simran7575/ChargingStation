import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { Colors } from "../../constants/Color";
import ContactContainer from "../contactusscreen/contactusComponents/ContactContainer";
import Card from "../signupscreen/signupComponents/Card";
import HeaderIcon from "../../components/HeaderIcon";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../store/auth-context";

// create a component
function AccountDetails({ navigation }) {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.user.userDetails;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/back-white.png")}
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}></View>
      <View style={styles.lowerContainer}></View>
      <View style={styles.card}>
        <Card>
          <View style={styles.imageContainer}>
            <View style={styles.image}>
              <Ionicons name="person-outline" color={Colors.teal} size={120} />
            </View>
            <View style={styles.camera}>
              <Image
                source={require("../../assets/icons/camera-1.png")}
                style={styles.cameraImage}
              />
            </View>
          </View>
          <View style={styles.middle}></View>
          <Text style={styles.title}>Account Details</Text>
          <ContactContainer
            name="Name"
            description={userData.firstname + " " + userData.lastname}
            icon={require("../../assets/icons/user-1.png")}
          />
          <ContactContainer
            name="Email"
            description={userData.email ? userData.email : "______________"}
            icon={require("../../assets/icons/letter.png")}
          />
          <ContactContainer
            name="Phone No"
            description={userData.phone}
            icon={require("../../assets/icons/phone-call.png")}
          />
        </Card>
      </View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 2,
    backgroundColor: Colors.teal,
  },
  lowerContainer: {
    flex: 4,
    backgroundColor: Colors.appBackground,
  },
  title: {
    fontSize: 19,
    fontFamily: "poppins-medium",
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: Colors.lightTeal,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: -100,
  },
  middle: {
    height: 100,
  },

  icon: {
    margin: 12,
  },
  card: {
    position: "absolute",
    top: 100,
    bottom: 0,
    left: 0,
    right: 0,
  },
  camera: {
    position: "absolute",
    top: 50,
    bottom: 0,
    left: 260,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraImage: {
    width: 20,
    height: 20,
  },
});

//make this component available to the app
export default AccountDetails;

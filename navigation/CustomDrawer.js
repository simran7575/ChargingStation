import { View, Text, StyleSheet, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Colors } from "../constants/Color";
import { Ionicons } from "@expo/vector-icons";

// create a component
const CustomDrawer = (props) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.teal }}
      >
        <View style={styles.header}>
          <View>
            <View style={styles.profile}>
              <Ionicons name="person-outline" color={Colors.black} size={80} />
            </View>
            <View style={styles.camera}>
              <Image
                source={require("../assets/icons/camera-1.png")}
                style={styles.cameraImage}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nametext}>Rohit Kumar</Text>
            <Text style={styles.numbertext}>+91 90123456</Text>
          </View>
        </View>
        <View style={styles.middle}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
  middle: {
    backgroundColor: Colors.appBackground,
    paddingTop: 20,
  },
  profile: {
    width: 120,
    height: 120,
    backgroundColor: Colors.appBackground,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  camera: {
    position: "absolute",
    top: 20,
    bottom: 0,
    left: 100,
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
  nametext: {
    fontFamily: "poppins-medium",
    fontSize: 15,
    color: Colors.white,
  },
  numbertext: {
    fontFamily: "poppins-regular",
    fontSize: 12,
    color: Colors.white,
  },
  textContainer: {
    marginTop: 12,
  },
});

//make this component available to the app
export default CustomDrawer;

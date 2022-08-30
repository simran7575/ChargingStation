import { useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Colors } from "../constants/Color";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";

// create a component
const CustomDrawer = (props) => {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.user.userDetails;
  const logOut = () => {
    authCtx.logout();
  };
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
            <Text style={styles.nametext}>
              {userData.firstname + " " + userData.lastname}
            </Text>
            <Text style={styles.numbertext}>{userData.phone}</Text>
          </View>
        </View>
        <View style={styles.middle}>
          <DrawerItemList {...props} />
          <Pressable
            style={({ pressed }) => [styles.logout, pressed && styles.pressed]}
            onPress={logOut}
          >
            <Image
              source={require("../assets/icons/logout.png")}
              style={styles.icon}
            />
            <Text style={styles.label}>Logout</Text>
          </Pressable>
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
  icon: {
    width: 28,
    height: 28,
    marginRight: 32,
  },
  label: {
    fontSize: 18,
    fontFamily: "poppins-regular",
  },
  logout: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: Colors.gray2,
  },
});

//make this component available to the app
export default CustomDrawer;

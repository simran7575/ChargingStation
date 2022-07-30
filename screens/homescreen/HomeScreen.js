import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import SetBackground from "../../components/SetBackground";
import { Colors } from "../../constants/Color";
import Images from "../../constants/Images";
import CardItem from "./homeScreenComponents/CardItems";
import CustomIcon from "./homeScreenComponents/CustomIcon";
import HeaderIcon from "../../components/HeaderIcon";
import { Ionicons } from "@expo/vector-icons";

// create a component
const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/menu.png")}
          toggle={true}
        />
      ),
      headerRight: () => (
        <Pressable
          style={styles.icon}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            color={Colors.white}
            size={26}
          />
        </Pressable>
      ),
    });
  });
  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.homeUpper}
        lowerImage={Images.homeBottom}
      ></SetBackground>

      <View style={styles.detailContainer}>
        <View style={styles.upperContainer}>
          <Text style={styles.welcome}>Hi</Text>
          <Text style={styles.name}>Rohit Kumar</Text>
        </View>
        <View style={styles.cardContainer}>
          <CardItem onPress={() => navigation.navigate("ChargeNow")}>
            <CustomIcon
              icon={require("../../assets/icons/electric-motor-1.png")}
            />
            <Text style={styles.chargeText}>Charge Now</Text>
          </CardItem>
          <CardItem onPress={() => navigation.navigate("ChargeLater")}>
            <CustomIcon icon={require("../../assets/icons/charge-later.png")} />
            <Text style={styles.chargeText}>Charge Later</Text>
          </CardItem>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },

  detailContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-around",
  },
  chargeText: {
    marginTop: 18,
    fontSize: 16,
    fontFamily: "poppins-medium",
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    flex: 3,
    alignItems: "flex-start",
  },
  upperContainer: {
    flex: 2,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  welcome: {
    fontSize: 17,
    fontFamily: "poppins-medium",
    color: Colors.black,
  },

  name: {
    fontSize: 20,
    fontFamily: "poppins-medium",
    color: Colors.black,
  },
  icon: {
    margin: 16,
  },
});

//make this component available to the app
export default HomeScreen;

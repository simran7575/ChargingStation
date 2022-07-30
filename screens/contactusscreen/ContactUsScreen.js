import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/Color";
import ContactContainer from "./contactusComponents/ContactContainer";
import Card from "../signupscreen/signupComponents/Card";
import HeaderIcon from "../../components/HeaderIcon";

// create a component
function ContactUsScreen({ navigation }) {
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
      <Card>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/icons/contact-img.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.middle}></View>
        <Text style={styles.title}>Contact Us</Text>
        <ContactContainer
          name="Email"
          description="lorem@gmail.com"
          icon={require("../../assets/icons/letter.png")}
        />
        <ContactContainer
          name="Phone No"
          description="+91 90123456"
          icon={require("../../assets/icons/phone-call.png")}
        />
      </Card>
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
  menu: {
    width: 24,
    height: 24,
    marginHorizontal: 18,
  },
  icon: {
    margin: 12,
  },
});

//make this component available to the app
export default ContactUsScreen;

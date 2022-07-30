//import liraries
import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import Card from "../signupscreen/signupComponents/Card";
import HeaderIcon from "../../components/HeaderIcon";
import { Colors, titleStyle } from "../../constants/Color";
import TitleText from "../../components/TitleText";
import ContactContainer from "../contactusscreen/contactusComponents/ContactContainer";
import { BookingDetailsData } from "../../data/BookingDetailsData";
import CustomButton from "../signupscreen/signupComponents/CustomButton";
import CancellingSheet from "./bookingDetailsComponents/CancellingSheet";

// create a component
const BookingDetails = ({ route, navigation }) => {
  const [currentDisplayScreen, setCurrentDisplayScreen] = useState("main");
  const isChargingCompleted = route.params ? true : false;
  // const goToHistory = route.params.goToHistory == true ? true : false;

  const cancelBooking = () => {
    setCurrentDisplayScreen("cancel");
  };

  const removeCancelScreen = () => {
    setCurrentDisplayScreen("main");
  };
  const finalBookingCancel = () => {
    setCurrentDisplayScreen("main");
    navigation.navigate("Home");
  };
  const startCharging = () => {
    navigation.navigate("ChargingTransaction");
  };
  const navigationHandler = () => {
    if (isChargingCompleted) {
      navigation.navigate("Home");
    } else if (goToHistory) {
      navigation.navigate("BookingHistory");
    } else {
      undefined;
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/back-white.png")}
          onPress={navigationHandler}
        />
      ),
    });
  });

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <TitleText textstyle={titleStyle.title20}>
              Booking Details
            </TitleText>
            <ContactContainer
              name="Booking Id"
              description={BookingDetailsData[0].bookingId}
              icon={require("../../assets/icons/booking.png")}
            />
            <ContactContainer
              name="Socket Id"
              description={BookingDetailsData[0].socketId}
              icon={require("../../assets/icons/plugging.png")}
            />
            <ContactContainer
              name="Socket Address"
              description={BookingDetailsData[0].socketAddress}
              icon={require("../../assets/icons/placeholder.png")}
            />
            <ContactContainer
              name="Landmark"
              description={BookingDetailsData[0].landmark}
              icon={require("../../assets/icons/landmark.png")}
            />
            <TitleText textstyle={titleStyle.title17}>Socket Photo</TitleText>
            <Image
              source={require("../../assets/images/socket.png")}
              style={styles.socketImage}
            />
          </Card>
          <Card style={styles.cardBottom}>
            <TitleText textstyle={titleStyle.title20}>
              Socket specific details
            </TitleText>
            <ContactContainer
              name="Plug Type"
              description="Plug Type A"
              icon={require("../../assets/icons/power-plug.png")}
            />
            <TitleText textstyle={titleStyle.title17}>
              Instructions for the user
            </TitleText>
            <TitleText textstyle={titleStyle.text12}>
              {
                "Lorem Ipsum is some dummy text of the printing\nand typesetting industry. Lorem Ipsum has been\nthe industry's standard tummy text. "
              }
            </TitleText>
          </Card>
        </ScrollView>
      </View>
      {!isChargingCompleted && (
        <View style={styles.buttonContainer}>
          <CustomButton
            styleouter={styles.secondarybutton}
            textstyle={styles.buttonText}
            onPress={cancelBooking}
          >
            CANCEL
          </CustomButton>
          <CustomButton
            styleouter={styles.socketbutton}
            textstyle={styles.buttonText}
            onPress={() => {
              Alert.alert("Upcoming Feature......");
            }}
          >
            FIND SOCKET
          </CustomButton>
          <CustomButton
            styleouter={styles.button}
            textstyle={styles.buttonText}
            onPress={startCharging}
          >
            START
          </CustomButton>
        </View>
      )}

      <View style={styles.popups}>
        <CancellingSheet
          isModalShown={currentDisplayScreen == "cancel"}
          removeCancelScreen={removeCancelScreen}
          finalBookingCancel={finalBookingCancel}
        />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  card: {
    marginTop: 36,
    justifyContent: "flex-start",
    position: "relative",
  },
  cardBottom: {
    marginVertical: 24,
    justifyContent: "flex-start",
    position: "relative",
  },
  socket: {
    fontFamily: "poppins-medium",
    fontSize: 18,
    marginVertical: 4,
    textAlign: "left",
    marginBottom: 12,
  },
  socketImage: {
    width: 100,
    height: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 36,
    backgroundColor: Colors.white,
  },

  secondarybutton: {
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 100,
    maxWidth: 120,
    backgroundColor: Colors.gray3,
  },

  socketbutton: {
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 150,
    maxWidth: 170,
    backgroundColor: Colors.teal,
  },
  button: {
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 100,
    maxWidth: 120,
    backgroundColor: Colors.teal,
  },

  buttonText: {
    fontSize: 15,
  },
  popups: {
    position: "absolute",
    bottom: 20,
  },
});

//make this component available to the app
export default BookingDetails;

//import liraries
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import Card from "../signupscreen/signupComponents/Card";
import HeaderIcon from "../../components/HeaderIcon";
import { Colors, titleStyle } from "../../constants/Color";
import TitleText from "../../components/TitleText";
import ContactContainer from "../contactusscreen/contactusComponents/ContactContainer";
import { BottomSheet } from "@rneui/themed";
import CustomButton from "../signupscreen/signupComponents/CustomButton";
import CancellingSheet from "./bookingDetailsComponents/CancellingSheet";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  getBookingDetails,
  cancelMyBooking,
} from "../../api-services/ApiServices";
import { AuthContext } from "../../store/auth-context";
import BookingCancelSheet from "./bookingDetailsComponents/BookingCancelSheet";

// create a component
const BookingDetails = ({ route, navigation }) => {
  const [currentDisplayScreen, setCurrentDisplayScreen] = useState("main");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  //const isChargingCompleted = route.params ? true : false;
  // const goToHistory = route.params.goToHistory == true ? true : false;

  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;
  const bookingId = route.params.bookingId;
  const currentStatus = route.params.status;

  const cancelBooking = () => {
    setCurrentDisplayScreen("cancel");
  };

  const removeCancelScreen = () => {
    setCurrentDisplayScreen("main");
  };

  async function finalBookingCancel() {
    setCurrentDisplayScreen("main");
    setIsLoading(true);
    try {
      const response = await cancelMyBooking(token, bookingId);
      setIsLoading(false);
      if (!response.data.success) {
        return;
      }
      setShowCancelConfirm(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Error in Cancelling Bookings!", " please try again later!");
      setIsLoading(false);
    }
  }
  const startCharging = () => {
    navigation.navigate("ChargingTransaction", {
      bookingId: bookingData._id,
      status: "Upcoming",
    });
  };
  const navigationHandler = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    async function loadBookingSummary() {
      setIsLoading(true);
      try {
        const response = await getBookingDetails(token, bookingId);
        if (response.data.success) {
          setBookingData(response.data.booking);

          setIsLoading(false);
        } else {
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error in loading Bookings!", " please try again later!");
        setIsLoading(false);
      }
    }

    loadBookingSummary();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={titleStyle.stackheader}>
          <HeaderIcon
            navigation={navigation}
            source={require("../../assets/icons/back-white.png")}
            onPress={navigationHandler}
          />
        </View>
      ),
    });
  });
  if (isLoading || !bookingData) {
    return <LoadingOverlay />;
  }

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
              description={`B#${bookingData._id.slice(18, 24)}`}
              icon={require("../../assets/icons/booking.png")}
            />
            <ContactContainer
              name="Socket Id"
              description={`S#${bookingData.socket._id.slice(18, 24)}`}
              icon={require("../../assets/icons/plugging.png")}
            />
            <ContactContainer
              name="Socket Address"
              description={bookingData.socket.address}
              icon={require("../../assets/icons/placeholder.png")}
            />
            <ContactContainer
              name="Landmark"
              description="__________"
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
              description={bookingData.socket.plugType}
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
        <BottomSheet
          isVisible={showCancelConfirm}
          containerStyle={{ backgroundColor: "#858282AA" }}
        >
          <BookingCancelSheet />
        </BottomSheet>
      </View>
      {currentStatus == "Upcoming" && (
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

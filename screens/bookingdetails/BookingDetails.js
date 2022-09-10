//import liraries
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  BackHandler,
  Text,
  Pressable,
} from "react-native";
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
import openMap from "react-native-open-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

// create a component
let origin;
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
  const prevScreen = route.params.prevScreen;
  const currentStatus = route.params.status;

  const cancelBooking = () => {
    setCurrentDisplayScreen("cancel");
  };

  const removeCancelScreen = () => {
    setCurrentDisplayScreen("main");
  };

  async function openGoogleLink(latitude, longitude) {
    const address = bookingData.socket.address;

    openMap({
      latitude: latitude,
      longitude: longitude,
      zoom: 30,
      start: "My Location",
      end: address,
      mapType: "standard",
    });
  }

  const mapScreenHandler = () => {
    const userCoords = authCtx.user.userLocation;
    if (userCoords.length == 0) {
      (async () => {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Insufficient Permissions",
            "You need to grant location permissions to use this app!"
          );
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        authCtx.addUserLocation([
          location.coords.latitude,
          location.coords.longitude,
        ]);
        origin = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setIsLoading(false);
        openGoogleLink(origin.latitude, origin.longitude);
      })();
    } else {
      setIsLoading(true);
      origin = {
        latitude: userCoords[0],
        longitude: userCoords[1],
      };

      setIsLoading(false);
      openGoogleLink(origin.latitude, origin.longitude);
    }
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
      prevScreen: "BookingDetails",
    });
  };
  const navigationHandler = () => {
    if (prevScreen == "ChargeNow") {
      navigation.navigate("Home");
    } else {
      navigation.goBack();
    }
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

    function backButtonClick() {
      if (prevScreen == "ChargeNow") {
        navigation.navigate("Home");
      } else {
        navigation.goBack();
      }
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonClick
    );

    loadBookingSummary();

    return () => {
      backHandler.remove();
    };
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
          <Card style={styles.card} innerStyle={styles.innerCard}>
            <TitleText textstyle={titleStyle.title19}>
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
            {currentStatus == "Upcoming" ? (
              <View style={styles.direction}>
                <ContactContainer
                  name="Socket Address"
                  description={bookingData.socket.address}
                  icon={require("../../assets/icons/placeholder.png")}
                />
                <Pressable
                  style={({ pressed }) => [
                    styles.directionContainer,
                    pressed && styles.pressed,
                  ]}
                  onPress={mapScreenHandler}
                >
                  <Ionicons name="arrow-redo" color="white" size={20} />
                  <Text style={styles.directionText}>Directions</Text>
                </Pressable>
              </View>
            ) : (
              <ContactContainer
                name="Socket Address"
                description={bookingData.socket.address}
                icon={require("../../assets/icons/placeholder.png")}
              />
            )}
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
          <Card style={styles.cardBottom} innerStyle={styles.innerCard}>
            <TitleText textstyle={titleStyle.title19}>
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
          onBackdropPress={() => {
            setShowCancelConfirm(false);
            navigation.navigate("Home");
          }}
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
    marginTop: 32,
    justifyContent: "flex-start",
    position: "relative",
  },
  innerCard: {
    paddingVertical: 24,
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
  directionImg: {
    width: 18,
    height: 18,
  },
  direction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  directionContainer: {
    flexDirection: "row",
    backgroundColor: Colors.teal,
    paddingTop: 1,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  directionText: {
    fontFamily: "poppins-regular",
    fontSize: 10,
    color: Colors.white,
    marginLeft: 4,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.7,
  },
});

//make this component available to the app
export default BookingDetails;

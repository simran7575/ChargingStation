import { useLayoutEffect, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import HeaderIcon from "../../components/HeaderIcon";
import Card from "../signupscreen/signupComponents/Card";
import { Colors, titleStyle } from "../../constants/Color";
import ContactContainer from "../contactusscreen/contactusComponents/ContactContainer";
import Status from "../../components/Status";
import CustomButton from "../signupscreen/signupComponents/CustomButton";
import { AuthContext } from "../../store/auth-context";
import { getBookingDetails } from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getFormattedTime } from "../../utils/date";

// create a component
const BookingSummary = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState();
  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;

  const bookingId = route.params.bookingId;

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
      navigation.navigate("Home");
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
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => (
        <View style={titleStyle.stackheader}>
          <HeaderIcon
            navigation={navigation}
            source={require("../../assets/icons/back-white.png")}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </View>
      ),
    });
  });

  if (isLoading || !bookingData) {
    return <LoadingOverlay message="Loading..." />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}></View>
      <View style={styles.lowerContainer}></View>
      <View style={styles.card}>
        <Card>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/bike-rider-img-2.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.middle}></View>
          <View style={styles.titleContainer}>
            <Text style={titleStyle.title19}>Booking Summary</Text>
            <Status>{bookingData.status}</Status>
          </View>
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
            name="Time Consumed"
            description={`${getFormattedTime(
              bookingData.durationOfCharge
            )} Hrs`}
            icon={require("../../assets/icons/clock.png")}
          />
          <ContactContainer
            name="Unit Consumed"
            description={bookingData.unitsConsumed}
            icon={require("../../assets/icons/renewable-energy.png")}
          />
          <ContactContainer
            name="Billing Cost"
            description={bookingData.cost}
            icon={require("../../assets/icons/rupee1.png")}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              styleouter={styles.button}
              textstyle={styles.buttonText}
              onPress={() => {
                navigation.navigate("BookingDetails", {
                  bookingId: bookingId,
                  status: bookingData.status,
                });
              }}
            >
              BOOKING DETAILS
            </CustomButton>
          </View>
        </Card>
      </View>
    </View>
  );
};

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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    height: 80,
  },
  menu: {
    width: 24,
    height: 24,
    marginHorizontal: 18,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  secondarybutton: {
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 170,
    maxWidth: 170,
    backgroundColor: Colors.gray3,
  },
  button: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 220,
    maxWidth: 220,
    backgroundColor: Colors.teal,
  },
  buttonText: {
    fontSize: 16,
  },
});

//make this component available to the app
export default BookingSummary;

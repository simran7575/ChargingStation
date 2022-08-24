import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { getAllUserBookings } from "../../api-services/ApiServices";
import HeaderIcon from "../../components/HeaderIcon";
import { Colors } from "../../constants/Color";
import ChargeList from "./bookingHistoryComponents/ChargeList";
import LoadingOverlay from "../../components/LoadingOverlay";
import NoBookings from "./bookingHistoryComponents/NoBookingsScreen";
import { AuthContext } from "../../store/auth-context";

// create a component
function BookingHistory({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showNoBookingScreen, setShowNoBookingScreen] = useState(false);
  const [bookingData, setBookingData] = useState();
  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;

  useEffect(() => {
    let cancel = false;
    async function loadAllBookings() {
      setIsLoading(true);
      try {
        const response = await getAllUserBookings(token);
        if (cancel) {
          return;
        }
        if (response.data.success) {
          setBookingData(response.data.bookings);
          setIsLoading(false);
        } else {
          setShowNoBookingScreen(true);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error in loading Bookings!", " please try again later!");
        setIsLoading(false);
      }
    }

    loadAllBookings();
    return () => {
      cancel = true;
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/back-white.png")}
        />
      ),
      headerTransparent: false,
      headerStyle: { backgroundColor: Colors.teal },
    });
  });

  if (isLoading || !bookingData) {
    return <LoadingOverlay />;
  }
  if (showNoBookingScreen) {
    return <NoBookings />;
  }

  return (
    <View style={styles.container}>
      <ChargeList bookingData={bookingData} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
});

//make this component available to the app
export default BookingHistory;

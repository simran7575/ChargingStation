import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import HeaderIcon from "../../components/HeaderIcon";
import { titleStyle } from "../../constants/Color";
import InstructionAlert from "./chargingTransactionComponents/InstructionAlert";
import StopAlert from "./chargingTransactionComponents/StopAlert";
import { BottomSheet } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MiddleCard from "./chargingTransactionComponents/MiddleCard";
import BottomCard from "./chargingTransactionComponents/BottomCard";
import UpperCard from "./chargingTransactionComponents/UpperCard";
import {
  getBookingDetails,
  startCharging,
  stopCharging,
} from "../../api-services/ApiServices";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";

// create a component
let timervalue;
const ChargingTransaction = ({ navigation, route }) => {
  const [showInstructionsSheet, setShowInstructionsSheet] = useState(false);
  const [showStopSheet, setShowStopSheet] = useState(false);
  const [showtimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState();

  const bookingId = route.params.bookingId;
  const currentStatus = route.params.status;

  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;

  const moveToBookingSummary = () => {
    navigation.navigate("BookingSummary", { bookingId: bookingData._id });
  };
  const showInstructionSheet = () => {
    setShowInstructionsSheet(true);
  };
  const showStopTimerSheet = () => {
    setShowTimer(false);
    setShowStopSheet(true);
  };
  const hideStopSheet = () => {
    setShowTimer(true);
    setShowStopSheet(false);
  };
  async function stopTheTimer() {
    clearInterval(timervalue);
    setShowStopSheet(false);
    setEndTime(new Date());
    setIsLoading(true);
    try {
      const response = await stopCharging(token, bookingId, new Date());
      setIsLoading(false);
      if (!response.data.success) {
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", " please try again later!");
      setIsLoading(false);
    }

    moveToBookingSummary();
  }
  async function startTimer() {
    setShowInstructionsSheet(false);
    setShowTimer(true);
    setStartTime(new Date());
    setIsLoading(true);
    try {
      const response = await startCharging(token, bookingId, new Date());
      setIsLoading(false);
      if (!response.data.success) {
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", " please try again later!");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadBookingSummary() {
      setIsLoading(true);
      try {
        const response = await getBookingDetails(token, bookingId);
        if (response.data.success) {
          setBookingData(response.data.booking);
          if (response.data.booking.status == "Ongoing") {
            setStartTime(new Date(response.data.booking.chargeStartTime));
            setShowTimer(true);
          }

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

  const tick = () => {
    let difference = Math.floor(
      (new Date().getTime() - startTime.getTime()) / 1000
    );
    setCounter(difference);
  };

  useEffect(() => {
    if (showtimer) {
      timervalue = setInterval(tick, 1000);
      setTimer(timervalue);
    }

    return () => {
      clearInterval(timervalue);
    };
  }, [showtimer]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={titleStyle.stackheader}>
          <HeaderIcon
            navigation={navigation}
            source={require("../../assets/icons/back-white.png")}
          />
        </View>
      ),
      headerTitle: startTime ? "Charging Start" : "Charging Transaction",
    });
  });

  if (isLoading || !bookingData) {
    return <LoadingOverlay />;
  }
  return (
    <SafeAreaProvider>
      <View style={titleStyle.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <UpperCard
            counter={counter}
            starttimer={startTime}
            showInstructionSheet={showInstructionSheet}
            showStopSheet={showStopTimerSheet}
          />
          <MiddleCard data={bookingData} />
          <BottomCard data={bookingData} />
        </ScrollView>

        <BottomSheet
          isVisible={showInstructionsSheet}
          containerStyle={{ backgroundColor: "#858282AA" }}
        >
          <InstructionAlert removeInstructionScreen={startTimer} />
        </BottomSheet>

        <BottomSheet
          isVisible={showStopSheet}
          containerStyle={{ backgroundColor: "#858282AA" }}
        >
          <StopAlert stopNo={hideStopSheet} stopYes={stopTheTimer} />
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ChargingTransaction;

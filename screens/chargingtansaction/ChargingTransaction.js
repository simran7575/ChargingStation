import { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Text,
} from "react-native";
import HeaderIcon from "../../components/HeaderIcon";
import { titleStyle } from "../../constants/Color";
import Card from "../signupscreen/signupComponents/Card";
import { Colors } from "../../constants/Color";
import CustomButton from "../signupscreen/signupComponents/CustomButton";
import TitleText from "../../components/TitleText";
import ContactContainer from "../contactusscreen/contactusComponents/ContactContainer";
import { BookingDetailsData } from "../../data/BookingDetailsData";
import InstructionAlert from "./chargingTransactionComponents/InstructionAlert";
import StopAlert from "./chargingTransactionComponents/StopAlert";

// create a component
const ChargingTransaction = ({ navigation }) => {
  const [currentDisplayScreen, setCurrentDisplayScreen] = useState("main");
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(0);

  const showInstructions = () => {
    setCurrentDisplayScreen("instructions");
  };
  const showChargeStartScreen = () => {
    setCurrentDisplayScreen("start");
  };
  const showChargeStopScreen = () => {
    setCurrentDisplayScreen("stop");
  };
  const moveToBookingSummary = () => {
    navigation.navigate("BookingSummary");
  };

  const tick = () => {
    setCounter((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (currentDisplayScreen == "start") {
      let timer = setInterval(tick, 1000);
      setTimer(timer);
    } else if (currentDisplayScreen == "stop") {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [currentDisplayScreen]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/back-white.png")}
        />
      ),
      headerTitle:
        currentDisplayScreen == "start"
          ? "Charging Start"
          : "Charging Transaction",
    });
  });
  let hour = Math.floor(counter / 60);

  return (
    <View style={titleStyle.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <View style={styles.timerContainer}>
            <Image
              source={require("../../assets/icons/timer.png")}
              style={styles.timerImage}
            />
            <View style={styles.timer}>
              <Text style={styles.counter}>
                {hour.toString().length < 2 ? "0" + hour : hour}
                {" : "}
                {(counter % 60).toString().length < 2
                  ? "0" + (counter % 60)
                  : counter % 60}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {currentDisplayScreen == "main" ||
            currentDisplayScreen == "instructions" ? (
              <CustomButton
                styleouter={styles.button}
                textstyle={styles.buttonText}
                onPress={showInstructions}
              >
                START CHARGING
              </CustomButton>
            ) : (
              <View>
                <Pressable
                  style={({ pressed }) => [
                    styles.stopButton,
                    pressed && titleStyle.pressed,
                  ]}
                  onPress={showChargeStopScreen}
                >
                  <Image
                    source={require("../../assets/icons/icon-3.png")}
                    style={styles.stop}
                  />
                </Pressable>
                <TitleText textstyle={titleStyle.description}> Stop</TitleText>
              </View>
            )}
          </View>
        </Card>
        <Card style={styles.card}>
          <TitleText textstyle={titleStyle.title20}>Booking Details</TitleText>
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
      <View style={styles.popups}>
        {currentDisplayScreen == "instructions" ? (
          <InstructionAlert
            isModalShown={currentDisplayScreen == "instructions"}
            removeInstructionScreen={showChargeStartScreen}
          />
        ) : (
          <StopAlert
            isModalShown={currentDisplayScreen == "stop"}
            stopNo={showChargeStartScreen}
            stopYes={moveToBookingSummary}
          />
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  card: {
    marginTop: 36,
    justifyContent: "flex-start",
    position: "relative",
  },
  timerImage: {
    width: 160,
    height: 160,
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    fontSize: 20,
    fontFamily: "poppins-medium",
    color: Colors.white,
    letterSpacing: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 24,
  },
  button: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 4,
    minWidth: 200,
    maxWidth: 200,
    backgroundColor: Colors.teal,
  },

  buttonText: {
    fontSize: 15,
  },
  socketImage: {
    width: 100,
    height: 60,
  },
  cardBottom: {
    marginVertical: 24,
    justifyContent: "flex-start",
    position: "relative",
  },
  popups: {
    position: "absolute",
    bottom: 20,
  },
  stopButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightTeal,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  stop: {
    width: 30,
    height: 30,
  },
});

//make this component available to the app
export default ChargingTransaction;

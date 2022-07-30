import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import SetBackground from "../../components/SetBackground";
import Card from "../signupscreen/signupComponents/Card";
import Images from "../../constants/Images";
import { Colors } from "../../constants/Color";
import OTPTextView from "react-native-otp-textinput";
import CustomButton from "../signupscreen/signupComponents/CustomButton";

function OtpScreen() {
  const [internalVal, setInternalVal] = useState("");
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(59);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const [resendPassword, setResendPassword] = useState(false);
  const [invalidOtp, setInvalidOtp] = useState("");
  let input1 = useRef(null);

  const onChangeText = (val) => {
    setInternalVal(val);
  };

  const validateOtp = () => {
    if (internalVal.toString().length == 0) {
      setInvalidOtp("Field Required");
      return;
    } else if (internalVal.toString().length < 6) {
      setInvalidOtp("Invalid OTP");
      return;
    }
  };

  const clear = () => {
    input1.clear();
    setInternalVal("");
    setCounter(59);
    setIsTimerOver(false);
    setResendPassword(true);
  };

  const tick = () => {
    setCounter((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    if (counter != 0) {
      let timer = setInterval(tick, 1000);
      setTimer(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendPassword]);

  useEffect(() => {
    if (counter <= 0) {
      setIsTimerOver(true);
      setResendPassword(false);
      clearInterval(timer);
    }
  }, [counter]);

  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.loginUpper}
        lowerImage={Images.loginBottom}
      ></SetBackground>

      <Card>
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior="padding"
          style={styles.avoidingView}
        >
          <Text style={styles.descriptionText}>
            Please enter the verification code sent to your mobile
          </Text>
          <Text style={styles.textlabel}>Enter 6 digit code</Text>
          <View style={styles.otpcontainer}>
            <OTPTextView
              ref={(e) => (input1 = e)}
              handleTextChange={(e) => {
                setInvalidOtp("");
                onChangeText(e);
              }}
              textInputStyle={styles.roundedTextInput}
              inputCount={6}
              tintColor={Colors.teal}
              offTintColor={Colors.gray}
            />
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.error}> {invalidOtp}</Text>

            <View style={styles.timerContainer}>
              {!isTimerOver ? (
                <Text style={styles.timer}>
                  00:{counter.toString().length == 2 ? counter : "0" + counter}
                </Text>
              ) : (
                <Pressable onPress={clear}>
                  <Text style={styles.resend}>Resend</Text>
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.submitButton}>
            <CustomButton onPress={validateOtp}>VERIFY</CustomButton>
          </View>
        </KeyboardAvoidingView>
      </Card>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: "poppins-regular",
  },
  otpcontainer: {
    marginBottom: 6,
  },

  roundedTextInput: {
    width: 40,
    borderBottomWidth: 1.5,
  },
  textlabel: {
    marginTop: 24,
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
  timerContainer: {
    flexDirection: "row-reverse",
  },
  resend: {
    fontSize: 15,
    color: Colors.teal,
    fontFamily: "poppins-medium",
  },
  submitButton: {
    position: "absolute",
    bottom: -63,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  errorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    fontFamily: "poppins-regular",
    fontSize: 12,
  },
});

//make this component available to the app
export default OtpScreen;

import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import OTPTextView from "react-native-otp-textinput";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";

// create a component
const OtpForm = ({
  onChangeText,
  invalidOtp,
  verifyHandler,
  isTimerOver,
  counter,
  resendPasswordHandler,
}) => {
  let input1 = useRef(null);

  const clear = () => {
    input1.clear();
    resendPasswordHandler();
  };

  return (
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
              onChangeText(e);
            }}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
            tintColor={Colors.teal}
            offTintColor={Colors.gray4}
          />
        </View>
        <View style={styles.errorContainer}>
          {invalidOtp ? (
            <Text style={styles.error}> Invalid Otp</Text>
          ) : (
            <Text style={styles.error}>{""}</Text>
          )}

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
          <CustomButton onPress={verifyHandler}>VERIFY</CustomButton>
        </View>
      </KeyboardAvoidingView>
    </Card>
  );
};

// define your styles
const styles = StyleSheet.create({
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
export default OtpForm;

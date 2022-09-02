import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import SetBackground from "../../components/SetBackground";
import Images from "../../constants/Images";
import {
  validateOtpForSignUp,
  validateOtpForLogin,
  sendOtpForLogin,
  getUserDetails,
} from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import OtpForm from "./otpComponents/OtpForm";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

let firstName, lastName, email, phone, timervalue;
function OtpScreen({ navigation, route }) {
  const [internalVal, setInternalVal] = useState("");
  const [resendPassword, setResendPassword] = useState(false);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(59);
  const [isTimerOver, setIsTimerOver] = useState(false);

  const authCtx = useContext(AuthContext);

  const isSignup = route.params.isSignUp;

  const onChangeText = (val) => {
    setInternalVal(val);
  };

  const tick = () => {
    setCounter((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    if (counter != 0) {
      timervalue = setInterval(tick, 1000);
      setTimer(timervalue);
    }
    return () => {
      clearInterval(timervalue);
    };
  }, [resendPassword]);

  useEffect(() => {
    if (counter <= 0) {
      setIsTimerOver(true);
      setResendPassword(false);
      clearInterval(timervalue);
    }
  }, [counter]);

  async function resendPasswordHandler() {
    setResendPassword(true);
    setInternalVal("");
    setCounter(59);
    setIsTimerOver(false);
    setIsLoading(true);
    try {
      phone = route.params.phone;
      if (isSignup) {
        const response = await sendOtpForLogin(phone, false);
      } else {
        const response = await sendOtpForLogin(phone, true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication Failed!", " please try again later!");
      setIsLoading(false);
    }
  }

  async function onPressHandler() {
    if (internalVal.toString().length < 6) {
      setInvalidOtp(true);
      return;
    }
    setIsLoading(true);
    try {
      let res, token, user;
      if (isSignup) {
        firstName = route.params.firstName;
        lastName = route.params.lastName;
        email = route.params.email;
        phone = route.params.phone;
        res = await validateOtpForSignUp(
          phone,
          internalVal,
          firstName,
          lastName,
          email
        );
        token = res.data.token;
      } else {
        phone = route.params.phone;
        res = await validateOtpForLogin(phone, internalVal);

        token = res.data.token;
      }

      if (res.data.success) {
        const response = await getUserDetails(token);
        if (response.data.success) {
          authCtx.authenticate(token);
          authCtx.addUserDetails(response.data.user);
        }
      } else {
        setInvalidOtp(true);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      Alert.alert("Authentication Failed!", " please try again later!");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.loginUpper}
        lowerImage={Images.loginBottom}
      ></SetBackground>
      <OtpForm
        onChangeText={onChangeText}
        invalidOtp={invalidOtp}
        verifyHandler={onPressHandler}
        isTimerOver={isTimerOver}
        counter={counter}
        resendPasswordHandler={resendPasswordHandler}
      />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default OtpScreen;

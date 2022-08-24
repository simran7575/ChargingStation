import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { sendOtpForLogin, validatePhone } from "../../api-services/ApiServices";
import { postApi, API } from "../../api-services/HttpClient";
import LoadingOverlay from "../../components/LoadingOverlay";
import SetBackground from "../../components/SetBackground";
import { Colors } from "../../constants/Color";
import Images from "../../constants/Images";
import LoginForm from "./loginComponents/LoginForm";
import axios from "axios";

// create a component
function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneIsvalid, setPhoneIsvalid] = useState(true);

  async function loginHandler(phone) {
    const isValid = validatePhone(phone);
    setPhoneIsvalid(isValid);
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendOtpForLogin(phone, true);
      if (response.data.success) {
        navigation.replace("Otp", { isSignUp: false, phone: phone });
      } else {
        Alert.alert(response.data.message, " please try again later!");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication Failed!", " please try again later!");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Logging in..." />;
  }
  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.loginUpper}
        lowerImage={Images.loginBottom}
      ></SetBackground>
      <LoginForm phoneIsvalid={phoneIsvalid} loginHandler={loginHandler} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
});

//make this component available to the app
export default LoginScreen;

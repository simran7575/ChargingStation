import { useState } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import LoadingOverlay from "../../components/LoadingOverlay";
import SetBackground from "../../components/SetBackground";
import Images from "../../constants/Images";
import SignUpForm from "./signupComponents/SignUpForm";
import {
  validatePhone,
  validateEmail,
  validateNames,
  sendOtpForLogin,
} from "../../api-services/ApiServices";
import { API, postApi } from "../../api-services/HttpClient";
import axios from "axios";

// create a component
function SignupScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [credentialsIsvalid, setCredentialsIsvalid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });

  async function signUpHandler(firstName, lastName, email, phone) {
    const isFirstNameValid = validateNames(firstName, true);
    const isLastNameValid = validateNames(lastName, false);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    setCredentialsIsvalid({
      firstName: isFirstNameValid,
      lastName: isLastNameValid,
      email: isEmailValid,
      phone: isPhoneValid,
    });

    if (
      !isFirstNameValid ||
      !isEmailValid ||
      !isLastNameValid ||
      !isPhoneValid
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendOtpForLogin(phone, false);
      if (response.data.success) {
        navigation.replace("Otp", {
          isSignUp: true,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        });
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
    return <LoadingOverlay message="Signing Up..." />;
  }
  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.loginUpper}
        lowerImage={Images.loginBottom}
      ></SetBackground>

      <SignUpForm
        credentialsIsvalid={credentialsIsvalid}
        signUpHandler={signUpHandler}
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
export default SignupScreen;

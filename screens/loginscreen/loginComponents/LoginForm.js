import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import TitleText from "../../../components/TitleText";
import LabelAndInput from "../../signupscreen/signupComponents/LabelAndInput";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";
import { sendOtpForLogin } from "../../../api-services/ApiServices";
import { useNavigation } from "@react-navigation/native";

// create a component
const LoginForm = ({ loginHandler, phoneIsvalid }) => {
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  function updateInputValueHandler(enteredValue) {
    setPhone(enteredValue);
  }
  const switchToSignup = () => {
    navigation.replace("Signup");
  };

  return (
    <Card>
      <TitleText>Login</TitleText>
      <LabelAndInput
        label="Phone No"
        keyboard="phone-pad"
        required={true}
        value={phone}
        onUpdateValue={updateInputValueHandler}
        error={!phoneIsvalid}
      />
      <View style={styles.message}>
        <Text style={styles.switchscreen}> New User?</Text>

        <Pressable style={styles.loginButton} onPress={switchToSignup}>
          <Text style={styles.login}>SIGNUP</Text>
        </Pressable>
      </View>
      <View style={styles.submitButton}>
        <CustomButton onPress={loginHandler.bind(this, phone)}>
          NEXT
        </CustomButton>
      </View>
    </Card>
  );
};

// define your styles
const styles = StyleSheet.create({
  submitButton: {
    position: "absolute",
    bottom: -32,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  message: {
    marginVertical: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  login: {
    fontSize: 14,
    color: Colors.teal,
    fontWeight: "700",
    fontFamily: "poppins-regular",
  },
  switchscreen: {
    fontFamily: "poppins-regular",
    fontSize: 13,
  },
  loginButton: {
    marginBottom: 4,
    marginLeft: 4,
  },
});

//make this component available to the app
export default LoginForm;

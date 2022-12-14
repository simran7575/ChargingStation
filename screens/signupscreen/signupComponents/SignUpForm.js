import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import Card from "./Card";
import TitleText from "../../../components/TitleText";
import LabelAndInput from "./LabelAndInput";
import CustomButton from "./CustomButton";
import { Colors } from "../../../constants/Color";
import { createUser } from "../../../api-services/ApiServices";
import { useNavigation } from "@react-navigation/native";

// create a component
function SignUpForm({ credentialsIsvalid, signUpHandler }) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const switchToLogin = () => {
    navigation.replace("Login");
  };

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstName":
        setFirstName(enteredValue);
        break;
      case "lastName":
        setLastName(enteredValue);
        break;
      case "email":
        setEmail(enteredValue);
        break;
      case "phone":
        setPhone(enteredValue);
        break;
    }
  }

  return (
    <Card>
      <TitleText>Sign Up</TitleText>
      <LabelAndInput
        label="First Name"
        required={true}
        textInputConfig={{
          value: firstName,
          onChangeText: updateInputValueHandler.bind(this, "firstName"),
          keyboardType: "default",
        }}
        error={!credentialsIsvalid.firstName}
      />
      <LabelAndInput
        label="Last Name"
        textInputConfig={{
          value: lastName,
          onChangeText: updateInputValueHandler.bind(this, "lastName"),
          keyboardType: "default",
        }}
        error={!credentialsIsvalid.lastName}
      />
      <LabelAndInput
        label="Email"
        textInputConfig={{
          value: email,
          onChangeText: updateInputValueHandler.bind(this, "email"),
          keyboardType: "email-address",
        }}
        error={!credentialsIsvalid.email}
      />
      <LabelAndInput
        label="Phone No"
        required={true}
        textInputConfig={{
          value: phone,
          onChangeText: updateInputValueHandler.bind(this, "phone"),
          keyboardType: "phone-pad",
          maxLength: 10,
        }}
        error={!credentialsIsvalid.phone}
      />
      <View style={styles.message}>
        <Text style={styles.switchscreen}> Already a User?</Text>

        <Pressable style={styles.loginButton} onPress={switchToLogin}>
          <Text style={styles.login}>LOGIN</Text>
        </Pressable>
      </View>
      <View style={styles.submitButton}>
        <CustomButton
          onPress={signUpHandler.bind(this, firstName, lastName, email, phone)}
        >
          NEXT
        </CustomButton>
      </View>
    </Card>
  );
}

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
export default SignUpForm;

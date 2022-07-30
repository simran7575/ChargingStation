import { View, Text, StyleSheet } from "react-native";
import SetBackground from "../../components/SetBackground";
import TitleText from "../../components/TitleText";
import { Colors } from "../../constants/Color";
import Images from "../../constants/Images";
import Card from "./signupComponents/Card";
import CustomButton from "./signupComponents/CustomButton";
import LabelAndInput from "./signupComponents/LabelAndInput";

// create a component
function SignupScreen() {
  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.loginUpper}
        lowerImage={Images.loginBottom}
      ></SetBackground>
      <Card>
        <TitleText>Sign Up</TitleText>
        <LabelAndInput label="First Name" required={true} />
        <LabelAndInput label="Last Name" />
        <LabelAndInput label="Email" keyboard="email-address" />
        <LabelAndInput label="Phone No" keyboard="phone-pad" required={true} />
        <View style={styles.message}>
          <Text style={styles.switchscreen}>
            Already a user?<Text style={styles.login}> LOGIN</Text>
          </Text>
        </View>
        <View style={styles.submitButton}>
          <CustomButton>NEXT</CustomButton>
        </View>
      </Card>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
});

//make this component available to the app
export default SignupScreen;

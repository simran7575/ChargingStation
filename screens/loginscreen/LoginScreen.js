import { View, Text, StyleSheet } from "react-native";
import SetBackground from "../../components/SetBackground";
import Card from "../signupscreen/signupComponents/Card";
import TitleText from "../../components/TitleText";
import LabelAndInput from "../signupscreen/signupComponents/LabelAndInput";
import CustomButton from "../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../constants/Color";
import Images from "../../constants/Images";

// create a component
function LoginScreen() {
  return (
    <View style={styles.container}>
      <SetBackground
        upperImage={Images.loginUpper}
        lowerImage={Images.loginBottom}
      ></SetBackground>
      <Card>
        <TitleText>Login</TitleText>
        <LabelAndInput label="Phone No" keyboard="phone-pad" required={true} />
        <View style={styles.message}>
          <Text style={styles.switchscreen}>
            Not a user?<Text style={styles.login}> SIGNUP</Text>
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
    backgroundColor: Colors.appBackground,
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
export default LoginScreen;

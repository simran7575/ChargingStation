import { View, StyleSheet } from "react-native";
import { titleStyle } from "../../../constants/Color";
import TitleText from "../../../components/TitleText";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";

// create a component
const LogoutAlert = ({ logoutNo, logoutYes }) => {
  return (
    <View style={styles.container}>
      <TitleText textstyle={titleStyle.title17center}>
        Are you sure you want to logout?
      </TitleText>

      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.secondarybutton}
          textstyle={styles.buttonText}
          onPress={logoutNo}
        >
          NO
        </CustomButton>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={logoutYes}
        >
          YES
        </CustomButton>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  secondarybutton: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 140,
    maxWidth: 170,
    backgroundColor: Colors.gray3,
  },
  button: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 140,
    maxWidth: 170,
    backgroundColor: Colors.teal,
  },
  buttonText: {
    fontSize: 16,
  },
});

//make this component available to the app
export default LogoutAlert;

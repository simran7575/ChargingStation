import { View, StyleSheet } from "react-native";
import TitleText from "../../../components/TitleText";
import { titleStyle } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";
import Divider from "../../../components/Divider";

// create a component
const InstructionAlert = ({ removeInstructionScreen }) => {
  return (
    <View style={styles.container}>
      <Divider></Divider>
      <TitleText textstyle={titleStyle.title17}>
        Check your charger connections
      </TitleText>
      <TitleText textstyle={titleStyle.text12}>
        {
          "Make sure the cable and charger are properly\nConnected.\nIf you are using a cover case, try removing it"
        }
      </TitleText>
      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={removeInstructionScreen}
        >
          OK
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
export default InstructionAlert;

import { View, Text, StyleSheet } from "react-native";
import BottomPopup from "../../../components/BottomPopup";
import TitleText from "../../../components/TitleText";
import { titleStyle } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";

// create a component
const StopAlert = ({ isModalShown, stopNo, stopYes }) => {
  return (
    <BottomPopup isModalShown={isModalShown}>
      <TitleText textstyle={titleStyle.title17center}>
        Are you sure you want to stop?
      </TitleText>

      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.secondarybutton}
          textstyle={styles.buttonText}
          onPress={stopNo}
        >
          NO
        </CustomButton>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={stopYes}
        >
          YES
        </CustomButton>
      </View>
    </BottomPopup>
  );
};

// define your styles
const styles = StyleSheet.create({
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
export default StopAlert;

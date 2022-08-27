import { View, StyleSheet } from "react-native";
import BottomPopup from "../../../components/BottomPopup";
import TitleText from "../../../components/TitleText";
import { Colors } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";

// create a component
const BottomSheet = ({
  closeModal,
  isModalShown,
  setFetchSocketList,
  setIsModalShown,
}) => {
  return (
    <BottomPopup isModalShown={isModalShown} setIsModalShown={setIsModalShown}>
      <TitleText textstyle={styles.title}>Please Try Again</TitleText>
      <TitleText textstyle={styles.description}>
        {
          "There is no socket available at your selected location.\nPlease try again after sometime or try for different\nlocation."
        }
      </TitleText>
      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.closebutton}
          textstyle={styles.buttonText}
          onPress={closeModal}
        >
          CLOSE
        </CustomButton>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={setFetchSocketList}
        >
          TRY AGAIN
        </CustomButton>
      </View>
    </BottomPopup>
  );
};

// define your styles
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "poppins-medium",
    textAlign: "left",
  },
  description: {
    fontSize: 12,
    fontFamily: "poppins-regular",
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },

  closebutton: {
    paddingHorizontal: 32,
    paddingTop: 5,
    paddingBottom: 3,
    width: 150,
    backgroundColor: Colors.gray2,
  },
  button: {
    paddingHorizontal: 32,
    paddingTop: 5,
    paddingBottom: 3,
  },

  buttonText: {
    fontSize: 16,
  },
});

//make this component available to the app
export default BottomSheet;

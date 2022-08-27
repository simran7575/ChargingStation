import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { titleStyle } from "../../../constants/Color";
import BottomPopup from "../../../components/BottomPopup";
import TitleText from "../../../components/TitleText";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";

// create a component
const CancellingSheet = ({
  isModalShown,
  removeCancelScreen,
  finalBookingCancel,
}) => {
  const cancelBookingConfirmed = () => {
    finalBookingCancel();
  };

  let items = (
    <>
      <TitleText textstyle={titleStyle.title17}>
        Are you sure you want to cancel this booking?
      </TitleText>
      <TitleText textstyle={titleStyle.text12}>
        {
          "Lorem Ipsum is some dummy text of the printing\nand typesetting industry. Lorem Ipsum has been\nthe industry's standard tummy text. "
        }
      </TitleText>
      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.secondarybutton}
          textstyle={styles.buttonText}
          onPress={removeCancelScreen}
        >
          NO
        </CustomButton>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={cancelBookingConfirmed}
        >
          YES
        </CustomButton>
      </View>
    </>
  );

  return (
    <BottomPopup
      isModalShown={isModalShown}
      setIsModalShown={removeCancelScreen}
    >
      {items}
    </BottomPopup>
  );
};

// define your styles
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
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
  cancelContainer: {
    alignItems: "center",
  },
  cancelText: {
    color: Colors.red,
    marginVertical: 24,
  },
});

//make this component available to the app
export default CancellingSheet;

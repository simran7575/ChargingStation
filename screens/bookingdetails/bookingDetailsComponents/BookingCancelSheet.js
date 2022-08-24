import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import Divider from "../../../components/Divider";
import TitleText from "../../../components/TitleText";
import { Colors, titleStyle } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";

// create a component
const BookingCancelSheet = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Divider></Divider>
      <TitleText textstyle={titleStyle.title17center}>
        Your booking is successfully cancelled.
      </TitleText>
      <TitleText textstyle={titleStyle.text12center}>
        {
          "Lorem Ipsum is some dummy text of the printing\nand typesetting industry. Lorem Ipsum has been\nthe industry's standard tummy text. "
        }
      </TitleText>
      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          CLOSE
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
export default BookingCancelSheet;

import { View, StyleSheet, Image, Pressable } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import TitleText from "../../../components/TitleText";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { titleStyle, Colors } from "../../../constants/Color";

// create a component
function UpperCard({
  counter,
  starttimer,
  showInstructionSheet,
  showStopSheet,
}) {
  const result = new Date(counter * 1000).toISOString().slice(11, 19);
  return (
    <Card style={styles.card}>
      <View style={styles.timerContainer}>
        <Image
          source={require("../../../assets/icons/timer.png")}
          style={styles.timerImage}
        />
        <TitleText
          textstyle={styles.counterText}
          outerstyle={styles.counterContainer}
        >
          {result}
        </TitleText>
      </View>
      <View style={styles.buttonContainer}>
        {!starttimer ? (
          <CustomButton
            styleouter={styles.button}
            textstyle={styles.buttonText}
            onPress={showInstructionSheet}
          >
            START CHARGING
          </CustomButton>
        ) : (
          <View>
            <Pressable
              style={({ pressed }) => [
                styles.stopButton,
                pressed && titleStyle.pressed,
              ]}
              onPress={showStopSheet}
            >
              <Image
                source={require("../../../assets/icons/icon-3.png")}
                style={styles.stop}
              />
            </Pressable>
            <TitleText textstyle={titleStyle.description}>Stop</TitleText>
          </View>
        )}
      </View>
    </Card>
  );
}

// define your styles
const styles = StyleSheet.create({
  card: {
    marginTop: 36,
    justifyContent: "flex-start",
    position: "relative",
  },
  timerImage: {
    width: 160,
    height: 160,
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 24,
  },
  button: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 4,
    minWidth: 200,
    maxWidth: 200,
    backgroundColor: Colors.teal,
  },

  buttonText: {
    fontSize: 15,
  },

  stopButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightTeal,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  stop: {
    width: 30,
    height: 30,
  },
  counterContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: Colors.white,
    marginBottom: 0,
  },
});

//make this component available to the app
export default UpperCard;

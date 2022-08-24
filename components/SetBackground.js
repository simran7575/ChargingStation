import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SetBackground = ({ upperImage, lowerImage }) => {
  const { width, height } = Image.resolveAssetSource(lowerImage);
  const ratiolower = height / width;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={upperImage}
        style={[styles.upperimage]}
      ></ImageBackground>

      <View style={styles.base}>
        <ImageBackground
          source={lowerImage}
          style={[styles.lowerimage, { height: SCREEN_WIDTH * ratiolower }]}
        ></ImageBackground>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  upperimage: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
  },
  lowerimage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  base: {
    flex: 5,
    justifyContent: "flex-end",
  },
});

//make this component available to the app
export default SetBackground;

import { StyleSheet, Pressable } from "react-native";

// create a component
const CardItem = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 28,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    backgroundColor: "white",
    marginHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

//make this component available to the app
export default CardItem;

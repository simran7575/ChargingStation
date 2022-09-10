export const Colors = {
  lightTeal: "#bff2bd",
  teal: "#4ec14a",
  gray2: "#CECECE",
  gray4: "#858282",
  appBackground: "#f7f7f7",
  black: "#2f2d2d",
  white: "#ffffff",
  gray1: "#ebe8e8",
  gray3: "#AAAAAA",
  red: "#FF0000",
};

export const fontFamilies = {
  "poppins-regular": require("../assets/font/poppins/Poppins-Regular.otf"),
  "poppins-medium": require("../assets/font/poppins/Poppins-Medium.otf"),
  "poppins-semibold": require("../assets/font/poppins/Poppins-SemiBold.otf"),
  "poppins-thin": require("../assets/font/poppins/Poppins-Thin.otf"),
  "poppins-light": require("../assets/font/poppins/Poppins-Light.otf"),
  "poppins-black": require("../assets/font/poppins/Poppins-Black.otf"),
};

export const titleStyle = {
  title20: {
    fontFamily: "poppins-medium",
    fontSize: 20,
    marginBottom: 4,
    textAlign: "left",
    marginBottom: 12,
  },
  title19: {
    fontFamily: "poppins-medium",
    fontSize: 19,
    textAlign: "left",
    marginBottom: 6,
  },
  title17: {
    fontFamily: "poppins-medium",
    fontSize: 17,
    marginBottom: 4,
    textAlign: "left",
  },
  title17center: {
    fontFamily: "poppins-medium",
    fontSize: 17,
    marginVertical: 4,
    textAlign: "center",
  },
  text12: {
    fontSize: 12,
    fontFamily: "poppins-regular",
    textAlign: "left",
  },
  text12center: {
    fontSize: 12,
    fontFamily: "poppins-regular",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  description: {
    fontFamily: "poppins-medium",
    color: Colors.black,
    fontSize: 15,
  },
  pressed: {
    opacity: 0.7,
  },
  stackheader: {
    marginRight: 24,
  },

  header: {
    fontSize: 22,
    fontFamily: "poppins-regular",
    textAlignVertical: "bottom",
    includeFontPadding: false,
    color: Colors.white,
  },
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useReducer } from "react";

export const AuthContext = createContext({
  user: {},
  authenticate: (token) => {},
  logout: () => {},
  addUserDetails: (user) => {},
  addUserLocation: (location) => {},
});

const user = {
  token: "",
  isAuthenticated: !!this.token,
  userDetails: {},
  userLocation: [],
};

function userReducer(state, action) {
  switch (action.type) {
    case "AUTHENTICATE":
      AsyncStorage.setItem("token", action.payload);
      return { ...state, token: action.payload, isAuthenticated: true };
    //{...action.payload},...state;
    case "DETAILS":
      return { ...state, userDetails: action.payload };
    case "LOCATION":
      return { ...state, userLocation: action.payload };
    case "LOGOUT":
      AsyncStorage.removeItem("token");
      return { ...state, token: action.payload, isAuthenticated: false };
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, user);

  function authenticate(token) {
    dispatch({
      type: "AUTHENTICATE",
      payload: token,
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  }
  function addUserDetails(user) {
    dispatch({
      type: "DETAILS",
      payload: user,
    });
  }
  function addUserLocation(location) {
    dispatch({
      type: "LOCATION",
      payload: location,
    });
  }

  value = {
    user: userState,
    authenticate: authenticate,
    logout: logout,
    addUserDetails: addUserDetails,
    addUserLocation: addUserLocation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

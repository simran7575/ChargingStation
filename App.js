import { useState, useEffect, useContext } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { fontFamilies } from "./constants/Color";
import { AuthStack, AuthenticatedStackNavigation } from "./navigation/Stack";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetails } from "./api-services/ApiServices";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(fontFamilies);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        //await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  async function onNavigationReady() {
    await SplashScreen.hideAsync(); // just hide the splash screen after navigation ready
  }

  function Navigation() {
    const authCtx = useContext(AuthContext);

    return (
      <NavigationContainer onReady={onNavigationReady}>
        {!authCtx.user.isAuthenticated && <AuthStack />}
        {authCtx.user.isAuthenticated && <AuthenticatedStackNavigation />}
      </NavigationContainer>
    );
  }

  function Root() {
    const [isLogging, setIsLogging] = useState(true);
    const authCtx = useContext(AuthContext);
    useEffect(() => {
      let token;
      async function fetchToken() {
        token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await getUserDetails(token);

          if (response.data.success) {
            authCtx.authenticate(token);
            authCtx.addUserDetails(response.data.user);
          } else {
            AsyncStorage.removeItem("token");
          }
        }
        setIsLogging(false);
      }

      fetchToken();
    }, []);

    if (isLogging) {
      return null;
    }

    return <Navigation />;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

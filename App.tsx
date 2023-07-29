import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "screens/LoginScreen";
import SignUpScreen from "screens/SignUpScreen";
import WelcomeScreen from "screens/WelcomeScreen";
import { Colors } from "constants/colors";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import AuthContextProvider, { AuthContext } from "store/authContext";
import { useCallback, useContext, useEffect, useState } from "react";
import IconButton from "components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

const Stack = createNativeStackNavigator<AppNavigationParameterList>();

function Navigation() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: "white",
          contentStyle: { backgroundColor: Colors.primary100 }
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerRight: ({ tintColor }) => (
                <IconButton
                  iconName="exit"
                  color={tintColor}
                  onPress={authContext.logout}
                  size={24}
                />
              )
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Root() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchAuthToken() {
      const storedtoken = await AsyncStorage.getItem("token");
      if (storedtoken) {
        authContext.authenticate(storedtoken);
      }
      setAppIsReady(true);
    }

    fetchAuthToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

import AuthContent from "components/auth/AuthContent";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { useState, useContext } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { AuthContext } from "store/authContext";
import { login } from "util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  async function signInHandler(email: string, password: string) {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in. Please check your credentials or try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <AuthContent isLogin onAuthenticate={signInHandler} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

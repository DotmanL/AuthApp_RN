import AuthContent from "components/auth/AuthContent";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { useState, useContext } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { AuthContext } from "store/authContext";
import { createUser } from "util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  async function signUpHandler(email: string, password: string) {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not create user. Please check your credentials or try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <AuthContent onAuthenticate={signUpHandler} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignupScreen;

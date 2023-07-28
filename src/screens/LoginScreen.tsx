import AuthContent from "components/auth/AuthContent";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <AuthContent isLogin />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

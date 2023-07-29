import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "store/authContext";

function WelcomeScreen() {
  const [message, setMessage] = useState<string>("");
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  useEffect(() => {
    async function getMessage() {
      try {
        const response = await axios.get(
          `https://test-authapp-5b3b7-default-rtdb.firebaseio.com/message.json?auth=${token}`
        );
        setMessage(response.data);
      } catch (error) {
        Alert.alert("Couldnot get message, something went wrong.");
      }
    }
    getMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8
  }
});

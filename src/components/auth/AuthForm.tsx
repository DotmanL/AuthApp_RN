import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";
import { ICredentials } from "interfaces/ICredentials";

type Props = {
  isLogin?: boolean;
  onSubmit: (credentials: ICredentials) => void;
  credentialsInvalid: any;
};

function AuthForm(props: Props) {
  const { isLogin, onSubmit, credentialsInvalid } = props;
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch
  } = credentialsInvalid;

  enum InputType {
    Email = "email",
    ConfirmEmail = "confirmEmail",
    password = "password",
    confirmPassword = "confirmPassword"
  }

  function updateInputValueHandler(inputType: InputType, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={(text: string) =>
            updateInputValueHandler(InputType.Email, text)
          }
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={(text: string) =>
              updateInputValueHandler(InputType.ConfirmEmail, text)
            }
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={(text: string) =>
            updateInputValueHandler(InputType.password, text)
          }
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={(text: string) =>
              updateInputValueHandler(InputType.confirmPassword, text)
            }
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12
  },
  form: {}
});

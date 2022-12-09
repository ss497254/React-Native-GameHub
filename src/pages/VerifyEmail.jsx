import React, { memo, useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Alert,
} from "react-native";
import { Text, Button, Title } from "react-native-paper";
import { TextInput } from "../components/TextInput";
import Background from "../components/Background";
import { colors, h3, paragraph } from "../constants/appStyle";

export const VerifyEmail = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });

  const _onSendPressed = () => {
    Alert.alert("Email sent", "Email has been sent to your account!");
  };

  return (
    <Background>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          flex: 1,
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 180, height: 180 }}
        />

        <Title style={[h3, { marginVertical: 12 }]}>Verify Email</Title>

        <TextInput
          label="Email"
          returnKeyType="done"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
        />

        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          onPress={_onSendPressed}
          style={styles.button}
        >
          Verify Email
        </Button>
        <TouchableHighlight
          style={styles.back}
          onPress={() => navigation.navigate("SignIn")}
          underlayColor={colors.primary100}
        >
          <Text style={{ ...paragraph, color: colors["blue-500"] }}>
            ← Back to login
          </Text>
        </TouchableHighlight>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    marginTop: 20,
    paddingLeft: 10,
    width: "100%",
  },
  button: {
    marginTop: 12,
    width: "100%",
  },
  label: {
    color: colors["blue-500"],
    width: "100%",
  },
});

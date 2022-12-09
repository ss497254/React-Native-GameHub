import React, { memo, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Alert } from "react-native";
import { Text, Button, Title } from "react-native-paper";
import { TextInput } from "../components/TextInput";
import Background from "../components/Background";
import { colors, paragraph, h3 } from "../constants/appStyle";

export const ForgotPassword = ({ navigation }) => {
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
          flex: 1,
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 250, height: 250 }}
        />

        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            padding: 20,
            maxWidth: 500,
          }}
        >
          <Title style={[h3, { marginBottom: 12, textAlign: "center" }]}>
            Forgot Password
          </Title>
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
            Send Reset Instructions
          </Button>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("SignIn")}
            underlayColor={colors.primary100}
          >
            <Text style={{ ...paragraph, color: colors["blue-500"] }}>
              ← Back to login
            </Text>
          </TouchableOpacity>
        </View>
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

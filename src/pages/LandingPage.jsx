import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, small } from "../constants/appStyle";

const browserLink = (url) => () => {
  Linking.openURL(url).catch((err) =>
    Alert.alert("Error processing linking", err)
  );
};

export const LandingPage = () => {
  const { navigate } = useNavigation();

  const inset = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: inset.top, paddingBottom: inset.bottom },
      ]}
    >
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 40,
          maxWidth: 500,
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={{ marginTop: 20 }}>
          Identifying Dementia Patients' Behavioural Needs
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Button
          mode="contained"
          style={styles.authButton}
          contentStyle={{ height: 45 }}
          onPress={() => navigate("SignIn")}
          labelStyle={{
            fontSize: 18,
            color: colors.text,
          }}
        >
          Login
        </Button>
        <Button
          mode="outlined"
          style={[
            styles.authButton,
            {
              borderColor: colors["blue-500"],
              backgroundColor: colors.white,
              borderWidth: 1,
            },
          ]}
          contentStyle={{ height: 42 }}
          onPress={() => navigate("SignUp")}
          labelStyle={{ fontSize: 17 }}
        >
          Register
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <Text style={styles.text}>By signing in you accept our </Text>
        <TouchableOpacity
          onPress={browserLink("https://creaitors.vercel.app/privacy-policy")}
        >
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.text}> and </Text>
        <TouchableOpacity
          style={{ padding: 0 }}
          onPress={browserLink("https://creaitors.vercel.app/terms-of-service")}
        >
          <Text style={styles.link}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  link: {
    color: colors["blue-600"],
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  authButton: {
    marginBottom: 20,
  },
  buttonLabel: {
    fontWeight: "700",
  },
});

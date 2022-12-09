import { useFormik } from "formik";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import * as Yup from "yup";
import Background from "../components/Background";
import { PasswordInput } from "../components/PasswordInput";
import { colors, h5, paragraph, small } from "../constants/appStyle";
import { showToast } from "../lib/showToast";
import { useUserStore } from "../stores/useUserStore";

export const SignInPage = ({ navigation }) => {
  const setUser = useUserStore((s) => s.setUser);
  const { mutateAsync: login } = useMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const res = await login({ body: values, path: "/login" });

        if (res.user && res.user.userId) {
          setUser(res);
          showToast("Login successfull", "success");
        } else {
          showToast("Unable to login", "error");
        }
      } catch (e) {
        console.log({ e });
        showToast(e.message, "error");
      }
      setSubmitting(false);
    },
  });

  return (
    <Background>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        >
          <View
            style={{
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "flex-end",
              maxWidth: 500,
            }}
          >
            <Image
              style={{ width: 250, height: 250 }}
              source={require("../assets/icon.png")}
            />
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: 20,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Text
              style={{
                marginTop: 20,
                fontWeight: "700",
                fontSize: 28,
              }}
            >
              Welcome Back
            </Text>
            <Text>Login to continue!</Text>
            <TextInput
              mode="outlined"
              theme={{
                roundness: 10,
              }}
              style={styles.inputContainerStyle}
              label="Email"
              placeholder="Enter email"
              returnKeyType="next"
              value={formik.values.email}
              error={formik.errors.email}
              onChangeText={(value) =>
                formik.setFieldValue("email", value, !!formik.errors.email)
              }
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
            />
            {formik.errors.email && (
              <Text style={styles.errorMessage}>{formik.errors.email}</Text>
            )}
            <PasswordInput
              mode="outlined"
              returnKeyType="done"
              style={styles.inputContainerStyle}
              label="Password"
              placeholder="Enter password"
              value={formik.values.password}
              error={formik.errors.password}
              theme={{
                roundness: 10,
              }}
              onChangeText={(value) =>
                formik.setFieldValue(
                  "password",
                  value,
                  !!formik.errors.password
                )
              }
            />
            {formik.errors.password && (
              <Text style={styles.errorMessage}>{formik.errors.password}</Text>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              style={{
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  ...paragraph,
                  color: colors["gray-900"],
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Button
              mode="contained"
              style={{ marginTop: 30 }}
              contentStyle={{ flexDirection: "row-reverse", height: 45 }}
              onPress={() => formik.handleSubmit()}
              loading={formik.isSubmitting}
              labelStyle={{ fontSize: 18, color: colors.text }}
            >
              Login
            </Button>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 40,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text>
                  Don’t have an account?
                  <Text style={{ fontWeight: "bold" }}> Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 100,
    marginTop: 18,
  },
  label: {
    ...h5,
    marginTop: 20,
    marginBottom: -10,
  },
  textInput: {
    height: 55,
    borderColor: colors["gray-900"],
    borderWidth: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  orContainer: {
    marginVertical: 16,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  errorMessage: {
    ...small,
    marginLeft: 16,
    color: colors["red-900"],
  },
});

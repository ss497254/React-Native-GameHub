import { useFormik } from "formik";
import React, { memo } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { PasswordInput } from "../components/PasswordInput";
import { colors, h5, small } from "../constants/appStyle";
import { showToast } from "../lib/showToast";

export const SignUpPage = memo(({ navigation }) => {
  const { mutateAsync: register } = useMutation({});

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).min(8).required("Password is required"),
    }),
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const res = await register({
          body: values,
          path: "/register",
        });

        if (res.userId) {
          Alert.alert(
            "See your inbox",
            "A verification has been send to your email address"
          );
          navigation.navigate("SignIn");
        } else showToast("Unable to create accout", "error");
      } catch (e) {
        console.log({ e });
        showToast("Some error occured", "error");
      }

      setSubmitting(false);
    },
  });

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
      behavior={Platform.OS === "ios" ? "position" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          height: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Image
            style={{ width: 200, height: 200, marginTop: 40 }}
            source={require("../assets/icon.png")}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            fontWeight: "700",
            fontSize: 28,
          }}
        >
          Hello
        </Text>
        <Text>Register to continue!</Text>
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={styles.inputContainerStyle}
          label="First Name"
          placeholder="Enter first name"
          value={formik.values.firstName}
          error={formik.errors.firstName}
          onChangeText={(value) =>
            formik.setFieldValue("firstName", value, !!formik.errors.firstName)
          }
        />
        {formik.errors.firstName && (
          <Text style={styles.errorMessage}>{formik.errors.firstName}</Text>
        )}
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={styles.inputContainerStyle}
          label="Last Name"
          placeholder="Enter last name"
          value={formik.values.lastName}
          error={formik.errors.lastName}
          onChangeText={(value) =>
            formik.setFieldValue("lastName", value, !!formik.errors.lastName)
          }
        />
        {formik.errors.lastName && (
          <Text style={styles.errorMessage}>{formik.errors.lastName}</Text>
        )}
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={styles.inputContainerStyle}
          label="Email"
          placeholder="Enter email"
          value={formik.values.email}
          // theme={{ colors: { surface: "red" } }}
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
          style={styles.inputContainerStyle}
          label="Password"
          placeholder="Enter password"
          value={formik.values.password}
          error={formik.errors.password}
          theme={{
            roundness: 10,
          }}
          onChangeText={(value) =>
            formik.setFieldValue("password", value, !!formik.errors.password)
          }
        />
        {formik.errors.password && (
          <Text style={styles.errorMessage}>{formik.errors.password}</Text>
        )}
        <Button
          mode="contained"
          style={{ marginTop: 30 }}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          contentStyle={{ flexDirection: "row-reverse", height: 45 }}
          labelStyle={{ fontSize: 18, color: colors.text }}
        >
          Register
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{}}>
              Already have account?
              <Text style={{ fontWeight: "bold" }}> Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 100,
    marginTop: 20,
    // backgroundColor: "transparent",
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

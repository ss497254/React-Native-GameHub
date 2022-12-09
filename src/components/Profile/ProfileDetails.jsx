import { useFormik } from "formik";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput, Title } from "react-native-paper";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { DatePicker } from "../DatePicker";
import { GenderDropdown, Genders } from "../GenderDropdown";
import { colors, h5, radius, small } from "../../constants/appStyle";
import { showToast } from "../../lib/showToast";
import { useUserStore } from "../../stores/useUserStore";

export const ProfileDetails = memo(() => {
  const { user, fetchUser } = useUserStore((s) => s);

  const { mutateAsync: updateProfile } = useMutation({
    onSuccess: () => {},
  });

  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age || 0,
      dateOfBirth: user.dateOfBirth || new Date(),
      gender: user.gender,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required(),
      lastName: Yup.string().max(255).required(),
      email: Yup.string().email("Must be a valid email").max(255).required(),
      age: Yup.number("Enter age")
        .min(1, "Age must be more than 1")
        .max(100, "Age must be less than 100")
        .required("Enter age"),
      gender: Yup.string()
        .is(Genders.map((x) => x.label))
        .required(),
      dateOfBirth: Yup.date(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { affected } = await updateProfile({
          body: values,
          path: "/user",
          method: "PUT",
        });

        if (affected) {
          showToast("Updated Successfully", "success");
          fetchUser();
        }
      } catch (e) {
        console.log({ e });
        showToast("Some error occured", "error");
      }
      setSubmitting(false);
    },
  });

  return (
    <Surface
      style={{
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: colors.white,
        borderRadius: radius.m,
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
          borderBottomColor: colors["gray-600"],
          borderBottomWidth: 0.5,
          paddingTop: 16,
          paddingBottom: 22,
        }}
      >
        <Title style={{ fontSize: 22, fontWeight: "700" }}>Profile</Title>
        <Text
          style={{
            fontSize: 13,
            marginTop: -5,
            color: colors["gray-600"],
            fontWeight: "400",
          }}
        >
          The Information can be edited
        </Text>
      </View>
      <View style={{ padding: 20 }}>
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={[styles.inputContainerStyle, { marginTop: 0 }]}
          label="First Name"
          placeholder="Enter first name"
          value={formik.values.firstName}
          error={formik.errors.firstName}
          onChangeText={formik.handleChange("firstName")}
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
          onChangeText={formik.handleChange("lastName")}
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
          error={formik.errors.email}
          onChangeText={formik.handleChange("email")}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
        />
        {formik.errors.email && (
          <Text style={styles.errorMessage}>{formik.errors.email}</Text>
        )}
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={styles.inputContainerStyle}
          label="Enter Age"
          placeholder="Enter age"
          value={formik.values.age && formik.values.age.toString()}
          error={formik.errors.age}
          keyboardType="numeric"
          onChangeText={formik.handleChange("age")}
        />
        {formik.errors.age && (
          <Text style={styles.errorMessage}>{formik.errors.age}</Text>
        )}
        <DatePicker
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={styles.inputContainerStyle}
          label="Date of Birth"
          placeholder="dd/mm/yyyy"
          value={formik.values.dateOfBirth}
          error={formik.errors.dateOfBirth}
          onValueChange={(value) =>
            formik.setFieldValue(
              "dateOfBirth",
              value,
              !!formik.errors.dateOfBirth
            )
          }
        />
        {formik.errors.dateOfBirth && (
          <Text style={styles.errorMessage}>{formik.errors.dateOfBirth}</Text>
        )}
        <View
          style={[
            styles.inputContainerStyle,
            { marginTop: 20, marginBottom: 15 },
          ]}
        >
          <GenderDropdown
            value={formik.values.gender}
            onValueChange={(value) =>
              formik.setFieldValue("gender", value, false)
            }
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          paddingHorizontal: 15,
          borderTopColor: colors["gray-600"],
          borderTopWidth: 0.5,
          paddingVertical: 12,
        }}
      >
        <Button
          mode="contained"
          style={{ width: 140 }}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          onPress={() => formik.handleSubmit()}
          loading={formik.isSubmitting}
          labelStyle={{ fontSize: 16, color: colors.text }}
        >
          Update
        </Button>
      </View>
    </Surface>
  );
});

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 100,
    marginTop: 20,
  },
  segmentButton: { flex: 1, paddingVertical: 3 },
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
  errorMessage: {
    ...small,
    marginLeft: 16,
    color: colors["red-900"],
  },
});

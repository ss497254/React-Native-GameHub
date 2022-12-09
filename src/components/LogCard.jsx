import { useFormik } from "formik";
import React, { useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { DatePicker } from "../components/DatePicker";
import { EventController } from "../components/EventController";
import { MoodController } from "../components/MoodController";
import { colors, h3, h5, radius, small } from "../constants/appStyle";
import { showToast } from "../lib/showToast";
import { RNSlider } from "./RNSlider";

export const LogCard = ({
  initialValues,
  method = "POST",
  path = "/event-log",
}) => {
  const { mutateAsync: submitEvent } = useMutation();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      event: [],
      mood: "",
      stressLevel: 1,
      eventDate: new Date(),
      description: "",
    },
    validationSchema: Yup.object({
      event: Yup.array()
        .min(1)
        .of(Yup.string().required())
        .required("Event is required"),
      mood: Yup.string().required("Mood is required"),
      eventDate: Yup.date().required("Event date is required"),
      stressLevel: Yup.number()
        .min(1)
        .max(10)
        .required("Stress Level is required"),
      description: Yup.string(),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await submitEvent({
          body: values,
          path,
          method,
        });

        if (method === "POST" ? res.id : res.affected) {
          showToast("Submitted Successfully", "success");
          queryClient.invalidateQueries("/event-log");
        } else showToast("Some error occured", "error");
      } catch (e) {
        console.log({ e });
        showToast("Some error occured", "error");
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (!initialValues) return;

    Object.keys(initialValues).forEach(
      (x) =>
        initialValues[x] && formik.setFieldValue(x, initialValues[x], false)
    );
  }, [initialValues]);

  useEffect(() => {
    let message = "";
    if (formik.errors.mood) message += "Please select mood.\n";
    if (formik.errors.event) message += "Please select atleast 1 event.";

    if (message.length) Alert.alert("Form Error", message);
  }, [Object.keys(formik.errors).length]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
    >
      <ScrollView>
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
              paddingHorizontal: 20,
              borderBottomColor: colors["gray-600"],
              borderBottomWidth: 0.5,
              paddingTop: 12,
              paddingBottom: 18,
            }}
          >
            <Text style={h3}>Logs</Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: -5,
              }}
            >
              Submit your logs
            </Text>
          </View>

          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter-SemiBold",
              marginHorizontal: 20,
              marginTop: 20,
            }}
            variant="labelLarge"
          >
            How are you feeling today?
          </Text>

          <MoodController
            mood={formik.values.mood}
            error={formik.errors.mood}
            setMood={(value) =>
              formik.setFieldValue("mood", value, !!formik.errors.mood)
            }
          />

          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter-SemiBold",
              marginHorizontal: 20,

              marginTop: 20,
            }}
            variant="labelLarge"
          >
            Enter the event?
          </Text>
          <EventController
            events={formik.values.event}
            updateEventList={initialValues && initialValues.event}
            setEvents={(_event) =>
              formik.setFieldValue("event", _event, !!formik.errors.event)
            }
            error={formik.errors.event}
          />
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter-SemiBold",
              marginHorizontal: 20,

              marginTop: 10,
            }}
            variant="labelLarge"
          >
            Date of event?
          </Text>
          <DatePicker
            theme={{
              roundness: 10,
            }}
            style={{
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            label="Event Date"
            mode="outlined"
            value={formik.values.eventDate}
            placeholder="Select Date"
            error={formik.errors.eventDate}
            onValueChange={(value) =>
              formik.setFieldValue(
                "eventDate",
                value,
                !!formik.errors.eventDate
              )
            }
          />
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter-SemiBold",
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: -15,
            }}
            variant="labelLarge"
          >
            How much stress did it cause you?
          </Text>
          <View style={{ padding: 15 }}>
            <RNSlider
              step={10}
              defaultValue={formik.values.stressLevel}
              changeValue={initialValues && initialValues.stressLevel}
              onValueChange={(value) => {
                formik.setFieldValue(
                  "stressLevel",
                  value,
                  !!formik.errors.stressLevel
                );
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter-SemiBold",
              marginHorizontal: 20,

              marginTop: 16,
            }}
            variant="labelLarge"
          >
            What made you feel this way?
          </Text>
          <TextInput
            mode="outlined"
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 30,
            }}
            numberOfLines={8}
            theme={{
              roundness: 10,
            }}
            label="Description (optional)"
            multiline
            placeholder="Enter description"
            value={formik.values.description}
            error={formik.errors.description}
            onChangeText={(value) =>
              formik.setFieldValue("description", value, false)
            }
          />
          {formik.errors.description && (
            <Text style={styles.errorMessage}>{formik.errors.description}</Text>
          )}
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
              onPress={formik.handleSubmit}
              loading={formik.isSubmitting}
              labelStyle={{ fontSize: 16, color: colors.text }}
            >
              {method === "POST" ? "Submit" : "Update"}
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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

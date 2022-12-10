import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Keyboard, Platform, View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";

export const DatePicker = ({
  value,
  onValueChange = () => {},
  style,
  ...props
}) => {
  if (!(value instanceof Date)) {
    if (isNaN(Date.parse(value))) value = new Date();
    else value = new Date(value);
  }

  const [show, setShow] = useState(false);

  const showPicker = () => {
    Keyboard.dismiss();
    setShow(true);
  };

  const onChange = (_, selectedDate) => {
    setShow(false);
    onValueChange(selectedDate);
  };

  return (
    <View style={{ position: "relative", ...style }}>
      <TextInput
        value={value.toDateString().substr(4)}
        onFocus={showPicker}
        showSoftInputOnFocus={false}
        onChange={showPicker}
        {...props}
      />

      {show &&
        (Platform.OS === "ios" ? (
          <Surface
            style={{
              borderRadius: radius.m,
              padding: 10,
              backgroundColor: colors.white,
              position: "absolute",
              width: "100%",
              zIndex: 10,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <RNDateTimePicker
              value={value}
              mode={"date"}
              is24Hour={true}
              display="inline"
              onChange={onChange}
            />
          </Surface>
        ) : (
          <RNDateTimePicker
            value={value}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
          />
        ))}
    </View>
  );
};

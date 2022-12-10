import Slider from "@react-native-community/slider";
import React, { useRef } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../constants/AppStyle";

const Numbers = ({ step }) => {
  let x = [];

  for (let i = 1; i <= step; i++) x.push(i);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginRight: -4,
      }}
    >
      {x.map((i) => (
        <Text key={i}>{i}</Text>
      ))}
    </View>
  );
};

let f;

export const RNSlider = ({
  step,
  defaultValue,
  changeValue,
  onValueChange,
  ...props
}) => {
  const ref = useRef(defaultValue);

  if (changeValue) ref.current = changeValue;

  return (
    <View style={{ width: "100%", paddingTop: 20 }}>
      <Slider
        style={{ height: 30 }}
        minimumTrackTintColor={colors["blue-600"]}
        thumbTintColor={colors["blue-600"]}
        maximumTrackTintColor={colors["gray-400"]}
        step={1}
        minimumValue={1}
        maximumValue={10}
        value={ref.current}
        onValueChange={onValueChange}
        {...props}
      />
      <Numbers step={step} />
    </View>
  );
};

import React from "react";
import { View } from "react-native";
import { IconButton, Text, TouchableRipple } from "react-native-paper";
import { colors } from "../../constants/AppStyle";

const NumButton = ({ value, nums, onClick }: any) => {
  const active = nums.filter((x: number) => x === value).length > 0;

  const borderRadius = active ? 25 : 50;

  return (
    <TouchableRipple
      borderless
      style={{
        margin: 6,
        borderRadius,
      }}
      onPress={active ? null : onClick}
    >
      <Text
        style={{
          width: 90,
          height: 90,
          borderRadius,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textAlignVertical: "center",
          color: colors.white,
          backgroundColor: active ? colors["green-400"] : colors["blue-500"],
          fontSize: 30,
        }}
      >
        {value}
      </Text>
    </TouchableRipple>
  );
};

export const Task2Game = ({ setValue, nums }: any) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          width: 9 * 34,
        }}
      >
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <NumButton
              key={idx}
              nums={nums}
              value={(idx + 1) % 10}
              onClick={() => {
                nums.push((idx + 1) % 10);
                setValue({ nums });
              }}
            />
          ))}
      </View>
      <View
        style={{ flexDirection: "row-reverse", marginTop: -102, width: 300 }}
      >
        <TouchableRipple
          borderless
          style={{
            margin: 6,
            width: 90,
            borderRadius: 50,
            height: 90,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ef4444",
          }}
          onPress={() => {
            nums.pop();
            setValue({ nums });
          }}
        >
          <IconButton icon="backspace" iconColor={colors.white} size={28} />
        </TouchableRipple>
      </View>
    </>
  );
};

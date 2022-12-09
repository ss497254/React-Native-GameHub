import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";
import { colors, radius } from "../constants/appStyle";

export const Accordian = ({ heading, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <Surface
      style={{
        backgroundColor: colors.white,
        minHeight: 50,
        width: "100%",
        marginVertical: 8,
        borderRadius: radius.m,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setOpen(!open)}
      >
        <Text
          style={{
            paddingHorizontal: 15,
            flex: 1,
            width: "100%",
          }}
          variant={"bodyLarge"}
          onPress={() => setOpen(!open)}
        >
          {heading}
        </Text>
        <IconButton
          onPress={() => setOpen(!open)}
          icon={open ? "chevron-up" : "chevron-down"}
        ></IconButton>
      </View>
      {open && (
        <Text
          style={{
            padding: 15,
            paddingTop: 0,
            color: colors["gray-800"],
            textAlign: "justify",
          }}
          variant="labelLarge"
        >
          {content}
        </Text>
      )}
    </Surface>
  );
};

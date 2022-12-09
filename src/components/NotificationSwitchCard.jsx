import React, { memo, useState } from "react";
import { Alert, View } from "react-native";
import { colors, radius } from "../constants/appStyle";
import {
  Title,
  Text,
  Button,
  Switch,
  TouchableRipple,
  Surface,
} from "react-native-paper";

const SwitchRow = ({ title }) => {
  const [value, setValue] = useState(false);

  return (
    <TouchableRipple onPress={() => setValue(!value)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <Text variant="titleMedium">{title}</Text>
        <View pointerEvents="none">
          <Switch value={value} />
        </View>
      </View>
    </TouchableRipple>
  );
};

export const NotificationSwitchCard = memo(() => {
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
          paddingBottom: 16,
        }}
      >
        <Title style={{ fontSize: 22, fontWeight: "700" }}>Notifications</Title>
        <Text
          style={{
            fontSize: 13,
            marginTop: -3,
            color: colors["gray-600"],
            fontWeight: "400",
          }}
        >
          Manage notifications
        </Text>
      </View>
      {["Email", "Push Notifications", "Text Messages"].map((title, i) => (
        <SwitchRow title={title} key={i} />
      ))}

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
            backgroundColor: colors["blue-500"],
          }}
          onPress={() => {
            Alert.alert("Sorry", "We are still working on this");
          }}
          labelStyle={{ fontSize: 16, color: colors.text }}
        >
          Update
        </Button>
      </View>
    </Surface>
  );
});

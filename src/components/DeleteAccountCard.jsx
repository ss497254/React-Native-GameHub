import React, { memo } from "react";
import { View, Alert } from "react-native";
import { colors, radius } from "../constants/appStyle";
import { Title, Text, Button, Surface } from "react-native-paper";

export const DeleteAccountCard = memo(() => {
  return (
    <Surface
      style={{
        marginHorizontal: 10,
        marginBottom: 20,
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
        <Title style={{ fontSize: 22, fontWeight: "700" }}>
          Delete Account
        </Title>
      </View>
      <View style={{ padding: 20, paddingVertical: 30 }}>
        <Text variant={"bodyMedium"}>
          Permanently remove your Personal Account and all of its contents from
          the platform. This action is not reversible, so please continue with
          caution.
        </Text>
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
            backgroundColor: colors["red-500"],
          }}
          onPress={() => {
            Alert.alert("Sorry", "We are still working on this");
          }}
          labelStyle={{ fontSize: 16, color: colors.text }}
        >
          Delete
        </Button>
      </View>
    </Surface>
  );
});

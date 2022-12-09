import React, { memo } from "react";
import { Alert, View } from "react-native";
import { Button, Title, Text, Surface } from "react-native-paper";
import { colors, radius } from "../../constants/appStyle";
import { useUserStore } from "../../stores/useUserStore";
import { useQueryClient } from "react-query";

export const LogoutCard = memo(() => {
  const logout = useUserStore((s) => s.logout);
  const queryClient = useQueryClient();

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
          paddingVertical: 16,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700" }}>Logout</Text>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
        <Text
          style={{
            fontSize: 16,
            marginTop: -5,
          }}
          variant="labelLarge"
        >
          Logout from your account
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
          style={{ width: 140, backgroundColor: colors["red-500"] }}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  queryClient.invalidateQueries();
                  logout();
                },
              },
            ]);
          }}
          labelStyle={{ fontSize: 16, color: colors.text }}
        >
          Logout
        </Button>
      </View>
    </Surface>
  );
});

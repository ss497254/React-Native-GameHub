import React, { memo } from "react";
import { View } from "react-native";
import { Button, Surface, Text, Title } from "react-native-paper";
import { colors, radius } from "../../constants/appStyle";
import { useFitbitAuthWindow } from "../../hooks/useFitbitAuthWindow";
import { useUserStore } from "../../stores/useUserStore";

export const FitbitUpdateCard = memo(() => {
  const { user } = useUserStore((s) => s);
  const [windowOpen, setWindowOpen] = useFitbitAuthWindow(() =>
    setWindowOpen(false)
  );

  if (!user.isFitbitConnected) return null;

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
        <Title style={{ fontSize: 22, fontWeight: "700" }}>
          Fitbit Connect
        </Title>
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
        <Text
          style={{
            fontSize: 16,
            marginTop: -5,
          }}
          variant="labelLarge"
        >
          Update your fitbit connected account
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
          style={{ width: 140, backgroundColor: colors["blue-500"] }}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          loading={windowOpen}
          onPress={() => setWindowOpen(true)}
          labelStyle={{ fontSize: 16, color: colors.text }}
        >
          Update
        </Button>
      </View>
    </Surface>
  );
});

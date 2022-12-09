import React, { useState } from "react";
import { Banner, Text } from "react-native-paper";
import { colors } from "../constants/appStyle";
import { useFitbitAuthWindow } from "../hooks/useFitbitAuthWindow";
import { useUserStore } from "../stores/useUserStore";

export const FitbitIntegrationBanner = () => {
  const user = useUserStore((s) => s.user);
  const [open, setOpen] = useState(!user.isFitbitConnected);
  const [windowOpen, setWindowOpen] = useFitbitAuthWindow(() => setOpen(false));

  if (!open) return null;

  return (
    <Banner
      style={{
        backgroundColor: colors.white,
        borderTopColor: colors.black,
        borderTopWidth: 0.5,
      }}
      actions={[
        {
          label: "Do it later",
          onPress: () => setOpen(false),
        },
        {
          label: `Authorize`,
          onPress: () => {
            setWindowOpen(true);
          },
          loading: windowOpen,
        },
      ]}
      contentStyle={{ marginTop: -5 }}
      visible={open}
    >
      <Text style={{ fontSize: 16 }}>Please connect the app to fitbit.</Text>
    </Banner>
  );
};

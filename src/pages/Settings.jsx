import React, { memo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { DeleteAccountCard } from "../components/DeleteAccountCard";
import { NotificationSwitchCard } from "../components/NotificationSwitchCard";
import { TestingCard } from "../components/TestingCard";
import { colors } from "../constants/appStyle";

export const Settings = memo(() => {
  return (
    <ScrollView style={{ backgroundColor: colors["blue-300"] }}>
      <NotificationSwitchCard />
      <DeleteAccountCard />
      {process.env.NODE_ENV !== "production" && <TestingCard />}
    </ScrollView>
  );
});

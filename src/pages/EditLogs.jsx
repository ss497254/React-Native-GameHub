import React from "react";
import { View } from "react-native";
import { LogCard } from "../components/LogCard";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../constants/appStyle";

export const EditLogs = ({ route }) => {
  const { log, id } = route.params;

  return (
    <ScreenWrapper style={{ backgroundColor: colors["blue-300"] }}>
      <LogCard
        path={"/event-log/" + id}
        initialValues={{ ...log, id: undefined }}
        method="PUT"
      />
      <View style={{ height: 30 }} />
    </ScreenWrapper>
  );
};

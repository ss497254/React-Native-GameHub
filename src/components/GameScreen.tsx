import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar, Text } from "react-native-paper";

export const GameScreen: React.FC<{
  children: React.ReactNode;
  countDown?: number;
  currLevel: number;
  totalLevel: number;
  refreshScreen: string;
  scroll?: boolean;
}> = ({
  children,
  currLevel,
  totalLevel,
  refreshScreen = "Landing Page",
  scroll,
  countDown,
}) => {
  const { height } = Dimensions.get("window");
  const [refreshing, setRefreshing] = React.useState(false);

  const { navigate } = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //@ts-ignore
    navigate(refreshScreen);
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={{
        height: "100%",
      }}
      contentContainerStyle={{
        flex: scroll ? undefined : 1,
        alignItems: "center",
        minHeight: height,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 300,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        <Text style={{ flex: 1 }} variant="titleMedium">
          Progress
        </Text>
        <Text variant="titleMedium">
          {currLevel}/{totalLevel}
        </Text>
      </View>
      <ProgressBar
        progress={currLevel / totalLevel}
        style={{
          height: 10,
          borderRadius: 10,
          width: 300,
          marginBottom: 30,
        }}
      />
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {typeof countDown !== "undefined" ? (
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
            }}
          >
            {countDown > 0 ? countDown : ""}
          </Text>
        ) : null}
      </View>
      {children}
      <View style={{ flexGrow: 1 }}></View>
    </ScrollView>
  );
};

import React from "react";
import { colors } from "../constants/appStyle";
import { HistoryPage } from "../pages/HistoryPage";
import { LogsPage } from "../pages/LogsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { HomePage } from "../pages/HomePage";
import { BottomNavigation } from "react-native-paper";

export const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "Home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
      color: colors.accent,
    },
    {
      key: "Logs",
      title: "Logs",
      focusedIcon: "clipboard-edit",
      unfocusedIcon: "clipboard-edit-outline",
    },
    { key: "History", title: "History", focusedIcon: "history" },
    {
      key: "Profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: HomePage,
    Logs: LogsPage,
    History: HistoryPage,
    Profile: ProfilePage,
  });

  return (
    <BottomNavigation
      activeColor={colors["blue-500"]}
      theme={{ colors: { background: colors["blue-300"] } }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      renderScene={renderScene}
      barStyle={{
        backgroundColor: colors["gray-50"],
        color: colors["blue-500"],
        borderTopWidth: 0.5,
        borderTopColor: colors["gray-300"],
      }}
    />
  );
};

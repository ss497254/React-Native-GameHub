import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DefaultTheme as NavigatorTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { OfflineBar } from "./components/OfflineBar";
import { colors, fonts } from "./constants/appStyle";
import { AuthenticationSwitch } from "./navigation/AuthenticationSwitch";
import { navigationRef } from "./navigation/RootNavigation";
import { MainNavigator } from "./navigation/MainNavigator";

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: colors["blue-500"],
    secondary: colors["green-500"],
    tertiary: colors.accent,
    primaryContainer: colors["blue-200"],
    secondaryContainer: colors["blue-100"],
  },
  fonts,
};

const navigatorTheme = {
  ...NavigatorTheme,
  colors: {
    ...NavigatorTheme.colors,
    background: "transparent",
  },
};

export const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigatorTheme} ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>
      <OfflineBar />
    </PaperProvider>
  );
};

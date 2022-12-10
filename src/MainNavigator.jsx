import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DefaultTheme as NavigatorTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { DrawerContent } from "./components/DrawerContent";
import { Header } from "./components/Header";
import { colors, fonts } from "./constants/appStyle";
import { navigationRef } from "./navigation/RootNavigation";
import { HelpPage } from "./pages/HelpPage";
import ProfilePage from "./pages/ProfilePage";
import { Settings } from "./pages/Settings";
import { MainPage } from "./screens/MainPage";

const Drawer = createDrawerNavigator();

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

export const MainNavigator = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        theme={navigatorTheme}
        ref={navigationRef}
        linking={{ prefixes: ["cece://", "https://creaitors.vercel.app"] }}
      >
        <Drawer.Navigator
          initialRouteName="MainPage"
          drawerContent={DrawerContent}
        >
          <Drawer.Screen
            name="MainPage"
            options={{ headerShown: false }}
            component={MainPage}
          />
          <Drawer.Screen
            name="Settings"
            options={{
              header: (props) => <Header {...props} title="Settings" />,
            }}
            component={Settings}
          />
          <Drawer.Screen
            name="Health"
            options={{
              header: (props) => <Header {...props} title="Health" />,
            }}
            component={ProfilePage}
          />
          <Drawer.Screen
            name="HelpPage"
            options={{
              header: (props) => <Header {...props} back title="Help" />,
            }}
            component={HelpPage}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

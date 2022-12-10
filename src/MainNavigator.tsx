import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DefaultTheme as NavigatorTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { DrawerContent } from "./components/DrawerContent";
import { Header } from "./components/Header";
import { colors, fonts } from "./constants/AppStyle";
import { navigationRef } from "./navigation/RootNavigation";
import { MainPage } from "./screens/MainPage";
import Task1 from "./screens/Task1";
import Task2 from "./screens/Task2";
import Task3 from "./screens/Task3";
import Task4 from "./screens/Task4";
import Task5 from "./screens/Task5";
import ActivityLogs from "./screens/ActivityLogs";
import { useActivityLog } from "./stores/useActivityLog";

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
  const { addActivity } = useActivityLog((s) => s);

  useEffect(() => {
    addActivity({ timestamp: new Date().getTime(), message: "App Launced" });
    return () => {
      addActivity({ timestamp: new Date().getTime(), message: "App Closed!" });
    };
  }, []);

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
            name="Task1"
            options={{
              header: (props) => <Header {...props} back title="Task 1" />,
            }}
            component={Task1}
          />
          <Drawer.Screen
            name="Task2"
            options={{
              header: (props) => <Header {...props} back title="Task 2" />,
            }}
            component={Task2}
          />
          <Drawer.Screen
            name="Task3"
            options={{
              header: (props) => <Header {...props} back title="Task 3" />,
            }}
            component={Task3}
          />
          <Drawer.Screen
            name="Task4"
            options={{
              header: (props) => <Header {...props} back title="Task 4" />,
            }}
            component={Task4}
          />
          <Drawer.Screen
            name="Task5"
            options={{
              header: (props) => <Header {...props} back title="Task 5" />,
            }}
            component={Task5}
          />
          <Drawer.Screen
            name="ActivityLogs"
            options={{
              header: (props) => (
                <Header {...props} back title="Activity Logs" />
              ),
            }}
            component={ActivityLogs}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

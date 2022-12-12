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
import { HomePage } from "./screens/HomePage";
import Task1 from "./screens/Task1";
import Task2 from "./screens/Task2";
import Task3 from "./screens/Task3";
import Task4 from "./screens/Task4";
import Task5 from "./screens/Task5";
import ActivityLogs from "./screens/ActivityLogs";
// import A from "./screens/A";
import { useActivityLog } from "./stores/useActivityLog";
import { task1, task2, task3, task4, task5 } from "./constants/tasks";
import { TaskInstructionView } from "./components/TaskInstructionView";

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

const tasks = [task1, task2, task3, task4, task5];
const games = [Task1, Task2, Task3, Task4, Task5];

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
          initialRouteName="Home Page"
          drawerContent={DrawerContent}
        >
          <Drawer.Screen
            name="Home Page"
            options={{ headerShown: false }}
            component={HomePage}
          />
          {tasks.map((task) => (
            <Drawer.Screen
              key={task.screen}
              name={task.screen}
              options={{
                header: (props) => (
                  <Header {...props} back title={task.screen} />
                ),
              }}
            >
              {() => <TaskInstructionView task={task} />}
            </Drawer.Screen>
          ))}
          {games.map((Task, idx) => (
            <Drawer.Screen
              key={tasks[idx].screen + " Game"}
              name={tasks[idx].screen + " Game"}
              options={{ headerShown: false }}
              component={Task}
            />
          ))}
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

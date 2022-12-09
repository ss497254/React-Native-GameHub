import React from "react";
import { HelpPage } from "../pages/HelpPage";
import { Settings } from "../pages/Settings";
import { EducationPage } from "../pages/EducationPage";
import { HealthPage } from "../pages/HealthPage";
import { Header } from "../components/Header";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { EditLogs } from "../pages/EditLogs";
import { DrawerContent } from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Settings" drawerContent={DrawerContent}>
      <Drawer.Screen
        name="MainPage"
        options={{
          header: (props) => <Header {...props} title="Settings" />,
        }}
        component={Settings}
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
        component={HealthPage}
      />
      <Drawer.Screen
        name="Education"
        options={{
          header: (props) => <Header {...props} title="Education" />,
        }}
        component={EducationPage}
      />
      <Drawer.Screen
        name="EditLogs"
        options={{
          header: (props) => <Header {...props} back title="Edit log" />,
        }}
        component={EditLogs}
      />
      <Drawer.Screen
        name="HelpPage"
        options={{
          header: (props) => <Header {...props} back title="Help" />,
        }}
        component={HelpPage}
      />
    </Drawer.Navigator>
  );
};

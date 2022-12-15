import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Drawer, Text } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { useTaskProgress } from "../stores/useTaskProgress";
import { useUserStore } from "../stores/useUserStore";

const DrawerItemsData = [
  {
    label: "Home",
    activeIcon: "home-variant",
    icon: "home-variant-outline",
    action: "Home Page",
  },
  {
    label: "Activity Log",
    activeIcon: "cog",
    icon: "cog-outline",
    action: "ActivityLogs",
  },
  {
    label: "Help",
    activeIcon: "help-circle",
    icon: "help-circle-outline",
    action: "Landing Page",
  },
];

export const DrawerContent = ({ navigation, state }: any) => {
  const user = useUserStore((s) => s.user);

  let activeRoute = "";
  if (!isNaN(state.index) && state.routes.length > 0)
    activeRoute = state.routes[state.index].name || "";

  const { resetTaskProgress } = useTaskProgress();

  return (
    <>
      <DrawerContentScrollView style={styles.drawerContent}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: colors["gray-500"],
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 120, height: 120, marginBottom: 40 }}
          />
          <View
            style={{
              backgroundColor: colors["gray-200"],
              borderRadius: radius.m,
              paddingVertical: 15,
              width: "100%",
              paddingLeft: 20,
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                fontSize: 18,
                marginBottom: 3,
                color: colors["blue-600"],
              }}
            >
              {user.firstName + " " + user.lastName}
            </Text>
            <Text variant="labelMedium" style={{ color: colors["gray-700"] }}>
              User
            </Text>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            flex: 1,
            marginVertical: 20,
            marginHorizontal: 6,
          }}
        >
          {DrawerItemsData.map((props, index) => (
            <Drawer.Item
              theme={{
                colors: { secondaryContainer: colors["light-blue-100"] },
              }}
              key={index}
              label={props.label}
              style={{ marginBottom: 8 }}
              active={activeRoute === props.action}
              icon={
                activeRoute === props.action ? props.activeIcon : props.icon
              }
              onPress={() => navigation.navigate(props.action)}
            />
          ))}
        </View>
      </DrawerContentScrollView>
      <Button
        onPress={resetTaskProgress}
        mode="contained"
        theme={{ roundness: 0 }}
        labelStyle={{ paddingVertical: 5 }}
      >
        Reset Progress
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  badge: {
    alignSelf: "center",
  },
});

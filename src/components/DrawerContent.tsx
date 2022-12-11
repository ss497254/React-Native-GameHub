import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Divider, Drawer, Text } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
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
    label: "Task4",
    activeIcon: "help-circle",
    icon: "help-circle-outline",
    action: "Task4",
  },
];

export const DrawerContent = ({ navigation, state }: any) => {
  const user = useUserStore((s) => s.user);
  const inset = useSafeAreaInsets();

  let activeRoute = "";
  if (!isNaN(state.index) && state.routes.length > 0)
    activeRoute = state.routes[state.index].name || "";

  return (
    <>
      <DrawerContentScrollView style={styles.drawerContent}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: colors["gray-500"],
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 150, height: 150, marginBottom: 20 }}
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
              style={{
                fontSize: 19,
                fontWeight: "600",
                color: colors["blue-600"],
              }}
            >
              {user.firstName + " " + user.lastName}
            </Text>
            <Text style={{ fontSize: 13, color: colors["gray-700"] }}>
              User
            </Text>
          </View>
        </View>
        <View style={{ flexGrow: 1, flex: 1, marginVertical: 20 }}>
          {DrawerItemsData.map((props, index) => (
            <Drawer.Item
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
      <Divider />
      <Text
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderTopWidth: 0.5,
          borderTopColor: colors["gray-500"],
          textAlign: "center",
          marginBottom: inset.bottom / 2,
        }}
        variant="labelSmall"
      >
        Made by CREaiTORS
      </Text>
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

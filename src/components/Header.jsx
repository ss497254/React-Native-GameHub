import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { colors } from "../constants/appStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Header = ({ navigation, back, title = "CREaiTORS" }) => {
  const inset = useSafeAreaInsets();

  return (
    <View
      style={{
        height: 55,
        borderBottomColor: colors["gray-300"],
        borderBottomWidth: 0.5,
        position: "relative",
        marginTop: inset.bottom,
        // borderTopColor: colors["gray-300"],
        // borderTopWidth: 0.5,
      }}
    >
      {back ? (
        <IconButton
          iconColor="black"
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
      ) : navigation.openDrawer ? (
        <IconButton
          iconColor="black"
          icon="menu"
          style={{ marginLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ) : null}
      <Text
        variant="labelLarge"
        style={{
          fontSize: 18,
          textAlign: "center",
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: -1,
          paddingTop: 18,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

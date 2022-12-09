import { Image } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { colors } from "../constants/appStyle";
import { memo } from "react";

export const LogsItem = memo(({ source, title, onPress }) => {
  return (
    <TouchableRipple
      style={{
        height: 105,
        width: 100,
        backgroundColor: colors["gray-200"],
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => onPress(title)}
    >
      <>
        <Image style={{ height: 38, width: 38 }} source={source} />
        <Text style={{ paddingTop: 10 }}>{title}</Text>
      </>
    </TouchableRipple>
  );
});

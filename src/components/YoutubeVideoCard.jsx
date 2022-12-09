import React from "react";
import { Surface, Text } from "react-native-paper";
import { Image, Linking, TouchableOpacity } from "react-native";
import { radius } from "../constants/appStyle";

export const YoutubeVideoCard = ({ videoId, title }) => {
  return (
    <Surface
      style={{
        padding: 15,
        borderRadius: radius.m,
        marginVertical: 8,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`)
        }
        activeOpacity={0.6}
      >
        <Image
          source={{ uri: `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg` }}
          style={{ height: 200, width: "100%" }}
        />
        <Text
          style={{ marginVertical: 16, fontWeight: "600" }}
          variant="titleMedium"
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Surface>
  );
};

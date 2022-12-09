import React, { memo } from "react";
import { Animated, Easing } from "react-native";
import { colors } from "../constants/appStyle";

export const Spinner = memo(
  ({
    style,
    size = 22,
    color = colors.transparent,
    bgColor = colors.white,
  }) => {
    let spinValue = new Animated.Value(0);

    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      })
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <Animated.View
        style={[
          style,
          {
            borderWidth: size / 10,
            borderRadius: size / 2,
            borderColor: color,
            height: size,
            width: size,
            transform: [{ rotate: spin }],
            borderLeftColor: bgColor,
            borderRightColor: bgColor,
            borderTopColor: bgColor,
          },
        ]}
      />
    );
  }
);

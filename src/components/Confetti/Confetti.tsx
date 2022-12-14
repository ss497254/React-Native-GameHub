import * as React from "react";
import { Animated } from "react-native";
import { randomValue } from "./utils";

export const Confetti = ({
  containerTransform,
  transform,
  opacity,
  color,
}: any) => {
  const width = randomValue(10, 20);
  const height = randomValue(8, 24);
  const isRounded = Math.round(randomValue(0, 1)) === 1;

  return (
    <Animated.View
      pointerEvents="none"
      renderToHardwareTextureAndroid={true}
      style={{
        transform: containerTransform,
        position: "absolute",
        left: 0,
        bottom: 0,
      }}
    >
      <Animated.View
        style={{
          width,
          height,
          backgroundColor: color,
          borderRadius: isRounded ? 100 : undefined,
          transform,
          opacity,
        }}
      />
    </Animated.View>
  );
};

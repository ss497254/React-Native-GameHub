import React, { useRef } from "react";
import { PanResponder, View } from "react-native";
import { useEvent } from "react-native-reanimated";

export const Draggable = ({
  changePos,
  size,
  children,
  top,
  bottom,
  left,
  right,
}: any) => {
  useEvent(
    () => () => {
      console.log("delete");
    },
    []
  );
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        // if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return;

        if (dx > 0 || dy > 0) {
          if (dx > dy && !right) changePos(1, 0);
          else if (dy > dx && !bottom) changePos(0, 1);
        } else {
          if (dx < dy && !left) changePos(-1, 0);
          else if (dy < dx && !top) changePos(0, -1);
        }
      },
    })
  ).current;

  return (
    <View
      style={{
        width: size * 1.4,
        height: size * 1.4,
        padding: size * 0.25,
        position: "absolute",
        transform: [{ translateX: size * -0.3 }, { translateY: size * -0.3 }],
        zIndex: 100,
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </View>
  );
};

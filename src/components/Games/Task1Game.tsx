import { ScrollView } from "react-native";
import React, { useState, useMemo, memo } from "react";
import { colors } from "../../constants/AppStyle";
import { IconButton } from "react-native-paper";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";

type props = {
  tiles: number;
  grid: number;
  visible: boolean;
  [x: string]: any;
};

const widthTable = {
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4.4,
};

export const TabButton = ({
  activeTiles,
  baseWidth,
  value,
  visible,
}: {
  activeTiles: Set<number>;
  baseWidth: number;
  value: number;
  visible: boolean;
}) => {
  const [pressed, setPressed] = useState(false);

  let backgroundColor =
      visible && activeTiles.has(value)
        ? colors["green-400"]
        : colors["blue-400"],
    icon = "";

  if (pressed) {
    if (activeTiles.has(value)) {
      backgroundColor = colors["green-400"];
      icon = "check";
    } else {
      backgroundColor = colors["red-400"];
      icon = "window-close";
    }
  }

  return (
    <IconButton
      icon={icon}
      iconColor={colors.white}
      style={{
        marginHorizontal: baseWidth * 0.5,
        marginVertical: baseWidth * 0.5,
        borderRadius: baseWidth,
        width: baseWidth * 10,
        height: baseWidth * 10,
        backgroundColor,
      }}
      onPress={
        visible
          ? undefined
          : () => {
              setPressed(true);
            }
      }
    />
  );
};

export const Task1Game: React.FC<props> = memo(
  ({ tiles = 3, grid = 5, visible }) => {
    //@ts-ignore
    const baseWidth = widthTable[grid];

    const activeTiles = useMemo(
      () => generateRandomNumberList(tiles, grid * grid),
      [tiles, grid]
    );

    return (
      <ScrollView
        contentContainerStyle={{
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          width: baseWidth * 11 * grid,
          height: baseWidth * 11 * grid,
        }}
      >
        {Array(grid * grid)
          .fill(0)
          .map((_, idx) => (
            <TabButton
              visible={visible}
              activeTiles={activeTiles}
              key={idx}
              value={idx}
              baseWidth={baseWidth}
            />
          ))}
      </ScrollView>
    );
  }
);

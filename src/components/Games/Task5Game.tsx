import React, { memo, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import generator from "generate-maze";
import { colors } from "../../constants/AppStyle";

type props = {
  tiles: number;
  grid: number;
  [x: string]: any;
};

const widthTable = {
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4.4,
  8: 4,
  9: 3.6,
  10: 3.2,
};

export const Box = ({
  baseWidth,
  bottom,
  top,
  left,
  right,
}: // x,
// y,
{
  baseWidth: number;
  [x: string]: any;
}) => {
  return (
    <View
      style={{
        borderWidth: 1.1,
        margin: -0.5,
        borderBottomColor: right ? colors.black : colors["blue-50"],
        borderTopColor: left ? colors.black : colors["blue-50"],
        borderLeftColor: top ? colors.black : colors["blue-50"],
        borderRightColor: bottom ? colors.black : colors["blue-50"],
        width: baseWidth * 11,
        height: baseWidth * 11,
      }}
    ></View>
  );
};

export const Task5Game: React.FC<props> = memo(({ tiles = 3, grid = 5 }) => {
  //@ts-ignore
  const baseWidth = widthTable[grid] || 3;

  const mazeMap: Object[][] = useMemo(
    () => generator(grid, grid, true, Math.round(Math.random() * 100000)),
    [grid]
  );
  tiles;

  return (
    <ScrollView
      contentContainerStyle={{
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors["blue-50"],
        width: baseWidth * 11 * grid + 1.5 - 1 * grid,
        height: baseWidth * 11 * grid + 1.5 - 1 * grid,
        borderWidth: 0.7,
      }}
    >
      {mazeMap.map((row, idx) => (
        <View key={idx}>
          {row.map((col, idx: number) => (
            <Box key={idx} baseWidth={baseWidth} {...col} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
});

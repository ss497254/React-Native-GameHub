import { View } from "react-native";
import React, { useState, useMemo, memo } from "react";
import { colors } from "../../constants/AppStyle";
import { IconButton } from "react-native-paper";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";
import { IconList } from "../../constants/IconList";

type props = {
  cards: number;
  images: number;
  grid: number;
  visible: boolean;
  [x: string]: any;
};

const widthTable: Record<number, number> = {
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4.4,
};

export const TabButton = ({
  active,
  baseWidth,
  iconSource: { icon = "", color },
  visible,
}: {
  active: boolean;
  iconSource: { icon?: string; color?: string };
  baseWidth: number;
  visible: boolean;
}) => {
  const [pressed, setPressed] = useState(false);

  let backgroundColor = active ? colors["gray-300"] : colors.white;

  if (pressed) {
    if (icon.length) {
      backgroundColor = colors["green-400"];
      icon = "check";
    } else {
      backgroundColor = colors["red-400"];
      icon = "window-close";
    }
  }

  return (
    <IconButton
      icon={visible || pressed ? icon : ""}
      iconColor={pressed ? colors.white : color}
      size={baseWidth * 8}
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

export const Task3Game: React.FC<props> = memo(
  ({ cards = 3, images, grid = 5, visible }) => {
    const baseWidth = widthTable[grid];
    let i = 0,
      j = 0;

    const activeCards = useMemo(
      () => generateRandomNumberList(cards, grid * grid),
      [cards, grid]
    );

    const activeImages = useMemo(
      () => generateRandomNumberList(images, cards),
      [images, cards]
    );

    const icons: typeof IconList = useMemo(
      () =>
        Array.from(generateRandomNumberList(images, IconList.length)).map(
          (x) => IconList[x]
        ),
      [images, cards]
    );

    return (
      <View
        style={{
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
              active={activeCards.has(idx)}
              iconSource={
                activeCards.has(idx) && activeImages.has(i++) ? icons[j++] : {}
              }
              key={idx}
              baseWidth={baseWidth}
            />
          ))}
      </View>
    );
  }
);

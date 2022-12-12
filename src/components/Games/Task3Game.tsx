import { View } from "react-native";
import React, { useState, useMemo, memo } from "react";
import { colors } from "../../constants/AppStyle";
import { IconButton } from "react-native-paper";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";

type props = {
  cards: number;
  images: number;
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
  active,
  activeImages,
  baseWidth,
  value,
  visible,
}: {
  active: boolean;
  activeImages: Set<number>;
  baseWidth: number;
  value: number;
  visible: boolean;
}) => {
  const [pressed, setPressed] = useState(false);

  let backgroundColor = active ? colors["gray-400"] : colors.white,
    icon =
      visible && activeImages.has(value)
        ? require("../../assets/icon.png")
        : "";

  if (pressed) {
    if (activeImages.has(value)) {
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

export const Task3Game: React.FC<props> = memo(
  ({ cards = 3, images, grid = 5, visible }) => {
    //@ts-ignore
    const baseWidth = widthTable[grid];
    let i = 0;

    const activeCards = useMemo(
      () => generateRandomNumberList(cards, grid * grid),
      [cards, grid]
    );

    const activeImages = useMemo(
      () => generateRandomNumberList(images, cards),
      [images, cards]
    );
    console.log(activeImages);

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
              activeImages={activeImages}
              key={idx}
              value={activeCards.has(idx) ? i++ : -1}
              baseWidth={baseWidth}
            />
          ))}
      </View>
    );
  }
);

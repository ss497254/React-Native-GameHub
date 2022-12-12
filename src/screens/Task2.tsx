import { GameScreen } from "../components/GameScreen";
import React, { useEffect, useState } from "react";
import { Task2Game } from "../components/Games/Task2Game";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { useMemo } from "react";
import { useCountDown } from "../stores/useCountdown";

const Tab = ({ value = { nums: [] }, res, level, visible }: any) => {
  return (
    <View
      style={{
        marginBottom: 40,
        flexDirection: "row",
        width: 300,
        justifyContent: level > 5 ? "space-between" : "space-evenly",
      }}
    >
      {(visible ? res : Array(level).fill(0)).map((_: number, idx: number) => {
        const active = !isNaN(value.nums[idx]);

        return (
          <Text
            key={idx}
            variant="titleMedium"
            style={{
              fontSize: 20,
              backgroundColor: active
                ? value.nums[idx] === res[idx]
                  ? colors["green-400"]
                  : colors["red-400"]
                : colors["gray-300"],
              paddingVertical: 20,
              paddingHorizontal: level > 5 ? (level > 6 ? 13 : 15) : 20,
              borderRadius: radius.m,
              color: active ? colors.white : colors.black,
            }}
          >
            {visible ? res[idx] : active ? value.nums[idx] : "  "}
          </Text>
        );
      })}
    </View>
  );
};

const Task2 = () => {
  const [value, setValue] = useState({ nums: [] });
  const [a, reset] = useState(false);
  const { countDown, startCountDown } = useCountDown((s) => s);

  const level = 7;
  const res = Array.from(
    useMemo(() => generateRandomNumberList(level, 9), [level, a])
  );

  useEffect(() => {
    const clearCountDown = startCountDown(4);
    return clearCountDown;
  }, [a]);

  return (
    <GameScreen
      key={a}
      reset={() => {
        setValue({ nums: [] });
        reset(!a);
      }}
    >
      {countDown.length > 0 ? (
        <>
          <Tab visible value={value} res={res} level={level} />
          <Text
            style={{
              flex: 1,
              fontSize: 40,
              fontWeight: "700",
              textAlignVertical: "center",
            }}
          >
            {countDown}
          </Text>
        </>
      ) : (
        <>
          <Tab value={value} res={res} level={level} />
          <Task2Game setValue={setValue} nums={value.nums} />
        </>
      )}
    </GameScreen>
  );
};

export default Task2;

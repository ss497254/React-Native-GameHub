import { GameScreen } from "../components/GameScreen";
import React, { useEffect, useState } from "react";
import { Task2Game } from "../components/Games/Task2Game";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors, radius } from "../constants/AppStyle";
import { useMemo } from "react";
import { useCountDown } from "../stores/useCountdown";

const Tab = ({ value }: any) => {
  const level = 5;

  const res = Array.from(
    useMemo(() => generateRandomNumberList(level, 9), [level])
  );
  console.log(res);

  return (
    <View
      style={{
        marginTop: 30,
        flexDirection: "row",
        width: 300,
        justifyContent: "space-between",
      }}
    >
      {Array(level)
        .fill(0)
        .map((_, idx) => {
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
                padding: 20,
                height: 65,
                borderRadius: radius.m,
                color: active ? colors.white : colors.black,
              }}
            >
              {active ? value.nums[idx] : "-"}
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

  useEffect(() => {
    const clearCountDown = startCountDown(4);
    return clearCountDown;
  }, [a]);

  return (
    <GameScreen key={a} reset={reset}>
      {countDown.length > 0 ? (
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
      ) : (
        <>
          <Tab value={value} />
          <Task2Game setValue={setValue} nums={value.nums} />
        </>
      )}
    </GameScreen>
  );
};

export default Task2;

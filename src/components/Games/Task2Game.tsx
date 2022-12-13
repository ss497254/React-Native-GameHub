import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { IconButton, Text, TouchableRipple } from "react-native-paper";
import { colors } from "../../constants/AppStyle";
import { compareArrays } from "../../utils/compareArrays";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";
import { NumberButton } from "../NumberButton";

const NumButton = ({ value, success, error, onClick }: any) => {
  const borderRadius = success || error ? 25 : 50;

  let backgroundColor = colors["blue-500"];

  if (success) backgroundColor = colors["green-400"];
  if (error) backgroundColor = colors["red-400"];

  return (
    <TouchableRipple
      borderless
      style={{
        margin: 6,
        borderRadius,
      }}
      onPress={success || error ? null : onClick}
    >
      <Text
        style={{
          width: 90,
          height: 90,
          borderRadius,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          textAlignVertical: "center",
          color: colors.white,
          backgroundColor,
          fontSize: 30,
        }}
      >
        {value}
      </Text>
    </TouchableRipple>
  );
};

export const Task2Game = ({ level, countDown, onSuccess, onError }: any) => {
  const [{ nums }, setValue] = useState<{ nums: number[] }>({ nums: [] });

  const res = Array.from(
    useMemo(() => generateRandomNumberList(level, 9), [level])
  );

  return (
    <>
      {countDown > 0 ? (
        <>
          <Text
            style={{
              flexGrow: 1,
              marginTop: -200,
              fontSize: 40,
              fontWeight: "700",
              textAlignVertical: "center",
            }}
          >
            {countDown === level + 1 ? "Ready" : countDown}
          </Text>
          <NumberButton
            countDown={countDown}
            nums={nums}
            res={res}
            level={level}
          />
        </>
      ) : (
        <>
          <NumberButton nums={nums} res={res} level={level} />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              width: 9 * 34,
            }}
          >
            {Array(10)
              .fill(0)
              .map((_, idx) => {
                const value = (idx + 1) % 10;
                const hasIdx = nums.indexOf(value);
                const success = hasIdx !== -1 && res[hasIdx] === value;

                return (
                  <NumButton
                    key={idx}
                    value={value}
                    success={success}
                    error={hasIdx !== -1 && !success}
                    onClick={() => {
                      nums.push(value);
                      setValue({ nums });

                      if (nums.length === level) {
                        if (compareArrays(nums, res)) onSuccess();
                        else onError();
                      }
                    }}
                  />
                );
              })}
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              marginTop: -102,
              width: 300,
            }}
          >
            <TouchableRipple
              borderless
              style={{
                margin: 6,
                width: 90,
                borderRadius: 50,
                height: 90,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors["gray-500"],
              }}
              onPress={() => {
                nums.pop();
                setValue({ nums });
              }}
            >
              <IconButton icon="backspace" iconColor={colors.white} size={28} />
            </TouchableRipple>
          </View>
        </>
      )}
    </>
  );
};

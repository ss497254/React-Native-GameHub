import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task4Game } from "../components/Games/Task4Game";
import { GameScreen } from "../components/GameScreen";
import { colors, radius } from "../constants/AppStyle";
import { WordList } from "../constants/wordList";
import { useCountDown } from "../hooks/useCountDown";
import { useTaskProgress } from "../stores/useTaskProgress";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";
import { task4Levels } from "../constants/GameLevel";
import Celebrations from "../components/Celebrations";

const Task4 = () => {
  const {
    updateTaskProgress,
    taskProgress: [_1, _2, _3, task4Progress],
  } = useTaskProgress((s) => s);
  if (task4Progress.currLevel === task4Progress.totalLevel)
    return <Celebrations />;

  const { words } = task4Levels[task4Progress.currLevel];
  const { countDown } = useCountDown(words);

  const activeWords = useMemo(
    () =>
      Array.from(generateRandomNumberList(words, WordList.length)).map(
        (x) => WordList[x]
      ),
    [words]
  );
  const wordlist = new Set<string>();

  activeWords.forEach((word) => wordlist.add(word));

  return (
    <GameScreen countDown={countDown} {...task4Progress}>
      {countDown > 0 ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            width: 300,
          }}
        >
          {activeWords.map((i) => (
            <Text
              variant="labelLarge"
              key={i}
              style={{
                width: 140,
                borderRadius: radius.m,
                backgroundColor: colors["blue-100"],
                margin: 5,
                paddingVertical: 10,
                textAlign: "center",
              }}
            >
              {i}
            </Text>
          ))}
        </View>
      ) : (
        <Task4Game
          activeWordList={wordlist}
          onSuccess={() => {
            updateTaskProgress(4, { currLevel: task4Progress.currLevel + 1 });
          }}
          onError={() => console.log("Incorrect", "error")}
        />
      )}
      <View style={{ height: 60 }} />
    </GameScreen>
  );
};

export default Task4;

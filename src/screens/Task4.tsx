import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task4Game } from "../components/Games/Task4Game";
import { GameScreen } from "../components/GameScreen";
import { colors, radius } from "../constants/AppStyle";
import { WordList } from "../constants/wordList";
import { useCountDown } from "../hooks/useCountDown";
import { showToast } from "../lib/showToast";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";

const Task4 = () => {
  const { countDown } = useCountDown(15);

  let words = 14;

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
    <GameScreen countDown={countDown} scroll>
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
          onError={() => showToast("Incorrect", "error")}
        />
      )}
      <View style={{ height: 60 }} />
    </GameScreen>
  );
};

export default Task4;

import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task4Game } from "../components/Games/Task4Game";
import { GameScreen } from "../components/GameScreen";
import { useCountDown } from "../stores/useCountdown";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";
import { WordList } from "../constants/wordList";
import { colors, radius } from "../constants/AppStyle";
import { showToast } from "../lib/showToast";

const Task4 = () => {
  const [a, reset] = useState(false);
  const { countDown, startCountDown } = useCountDown((s) => s);

  useEffect(() => {
    const clearCountDown = startCountDown(16);
    return clearCountDown;
  }, [a]);

  let words = 15;

  const activeWords = useMemo(
    () =>
      Array.from(generateRandomNumberList(words, WordList.length)).map(
        (x) => WordList[x]
      ),
    [words, a]
  );
  const wordlist = new Set<string>();

  activeWords.forEach((word) => wordlist.add(word));

  return (
    <GameScreen key={a} reset={reset} countDown={countDown} scroll>
      {countDown.length > 0 ? (
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
                backgroundColor: colors["blue-200"],
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
      <View style={{ height: 100 }} />
    </GameScreen>
  );
};

export default Task4;

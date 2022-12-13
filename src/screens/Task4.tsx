import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Task4Game } from "../components/Games/Task4Game";
import { GameScreen } from "../components/GameScreen";
import { colors, radius } from "../constants/AppStyle";
import { WordList } from "../constants/wordList";
import { showToast } from "../lib/showToast";
import { useCountDown } from "../stores/useCountdown";
import { generateRandomNumberList } from "../utils/generateRandomNumberList";

const Task4 = () => {
  const { countDown, startCountDown } = useCountDown((s) => s);

  useEffect(() => {
    const clearCountDown = startCountDown(16);
    return clearCountDown;
  }, []);

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
                backgroundColor: colors["light-blue-100"],
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

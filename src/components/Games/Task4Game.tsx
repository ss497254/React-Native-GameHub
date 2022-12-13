import React, { memo, useMemo, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { colors, radius } from "../../constants/AppStyle";
import { WordList } from "../../constants/wordList";
import { generateRandomNumberList } from "../../utils/generateRandomNumberList";

export const Task4Game: React.FC<{
  countDown: number;
  wordsToShow: number;
  onSuccess: () => void;
  onError: () => void;
  [x: string]: any;
}> = memo(({ countDown, onError = () => {}, wordsToShow }) => {
  const [words, setWords] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const activeWords = useMemo(() => {
    const temp = new Set<string>();

    generateRandomNumberList(wordsToShow, WordList.length).forEach((x) => {
      temp.add(WordList[x]);
    });

    return temp;
  }, [wordsToShow]);

  return (
    <KeyboardAvoidingView
      style={{
        width: 300,
        flex: 1,
        justifyContent: "center",
      }}
    >
      {countDown > 0 ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            width: 300,
          }}
        >
          {Array.from(activeWords).map((i) => (
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
        <>
          <Text
            variant="labelMedium"
            style={{
              marginBottom: 15,
            }}
          >
            Try to recall as many words as you can from the list.
          </Text>
          <TextInput
            mode="outlined"
            theme={{
              roundness: 10,
            }}
            underlineColor="transparent"
            style={{ width: 300 }}
            label="Word"
            placeholder="Enter words"
            value={value}
            onChangeText={(e) => setValue(e)}
            onSubmitEditing={(e) => {
              setValue("");
              words.push(value.trim());
              setWords(words);
              e.preventDefault();
            }}
            returnKeyType="next"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 60,
              width: 300,
              minHeight: 200,
            }}
          >
            {words.map((i) => {
              let backgroundColor = colors["red-400"];

              if (activeWords.has(i)) backgroundColor = colors["green-400"];
              else {
                onError();
                return null;
              }

              return (
                <Text
                  variant="labelLarge"
                  key={i}
                  style={{
                    width: 140,
                    borderRadius: radius.m,
                    backgroundColor,
                    margin: 5,
                    color: colors.white,
                    paddingVertical: 10,
                    textAlign: "center",
                  }}
                >
                  {i}
                </Text>
              );
            })}
          </ScrollView>
        </>
      )}
    </KeyboardAvoidingView>
  );
});

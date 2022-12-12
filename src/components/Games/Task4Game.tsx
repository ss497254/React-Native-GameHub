import React, { memo, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { colors, radius } from "../../constants/AppStyle";

type props = {
  [x: string]: any;
};

export const Task4Game: React.FC<props> = memo(
  ({ activeWordList, onError = () => {} }) => {
    const [words, setWords] = useState<string[]>([]);
    const [value, setValue] = useState("");

    return (
      <KeyboardAvoidingView
        style={{
          width: 300,
          flex: 1,
          justifyContent: "center",
        }}
      >
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
          style={{ width: 300 }}
          label="Word"
          placeholder="Enter words"
          value={value}
          onChangeText={(e) => setValue(e)}
          onSubmitEditing={(e) => {
            e.preventDefault();
            words.push(value.trim());
            setValue("");
            setWords(words);
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

            if (activeWordList.has(i)) backgroundColor = colors["green-400"];
            else onError();

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
      </KeyboardAvoidingView>
    );
  }
);

import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { Accordian } from "../components/Accordian";
import { colors } from "../constants/appStyle";

const list = [
  {
    heading: "How to submit logs?",
    content: `Press on logs tab on bottom naviagtion to open logs page.
Fill the details and click submit.
You will see green toast "Submitted Successfully".
If not make sure you are connected to internet.
If problem persist then try again in few minutes.`,
  },
  {
    heading: "How to see previous logs?",
    content: `Press on History tab on bottom navigation to open history logs page.
You will see a table containing all your previous logs.`,
  },
  {
    heading: "How to edit logs?",
    content: `On History tab you will see a table of your previous logs.
Click on row you want to edit.
It will open a page where you can edit log.
`,
  },
  {
    heading: "How to delete logs?",
    content: `On History tab you will find table of your previous logs.
First column of each row will be checkbox and when you click on it.
It delete button will appear on top.
When you click on delete button selected log will be deleted.
`,
  },
];

export const HelpPage = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: "100%",
        backgroundColor: colors["blue-200"],
        padding: 15,
      }}
    >
      <Text variant="titleLarge" style={{ marginVertical: 20 }}>
        Popular help resources
      </Text>
      {list.map((item, i) => (
        <Accordian heading={item.heading} content={item.content} key={i} />
      ))}
    </ScrollView>
  );
};

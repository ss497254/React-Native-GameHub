import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, Surface, Text, TouchableRipple } from "react-native-paper";
import CircularProgress from "../components/CircularProgress";
import { colors, radius } from "../constants/AppStyle";
import { Progress } from "../constants/progress";
import { task1, task2, task3, task4, task5 } from "../constants/tasks";
import { useTaskProgress } from "../stores/useTaskProgress";

const Tab = ({ title, color, progress, screen, navigate, num, icon }: any) => {
  let subTitleColor = "",
    subTitle = "";

  if (progress.currLevel === 0) {
    subTitleColor = Progress.NOT_STARTED.color;
    subTitle = Progress.NOT_STARTED.title;
  } else if (progress.currLevel === progress.totalLevel) {
    subTitleColor = Progress.COMPLETED.color;
    subTitle = Progress.COMPLETED.title;
  } else {
    subTitleColor = Progress.IN_PROGRESS.color;
    subTitle = Progress.IN_PROGRESS.title;
  }

  return (
    <Surface
      style={{
        backgroundColor: colors.white,
        height: 70,
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: radius.m,
        marginTop: 15,
      }}
    >
      <Text
        style={{
          height: 70,
          width: 45,
          display: "flex",
          textAlignVertical: "center",
          textAlign: "center",
          color,
          backgroundColor: colors["gray-200"],
        }}
        variant="titleLarge"
      >
        {num}
      </Text>
      <TouchableRipple
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigate(screen);
        }}
      >
        <>
          <View
            style={{
              flexGrow: 1,
              paddingLeft: 12,
            }}
          >
            <Text
              variant="titleLarge"
              style={{
                fontSize: 18,
                textAlignVertical: "center",
                color,
                marginBottom: 1,
              }}
            >
              {title}
            </Text>
            <Text variant="labelSmall" style={{ color: subTitleColor }}>
              {subTitle}
            </Text>
            {icon}
          </View>
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              // color: colors["green-500"],
              height: 40,
              width: 40,
              borderRadius: 100,
              backgroundColor: colors["gray-200"],
              fontSize: 16,
              marginRight: 20,
              fontWeight: "700",
            }}
          >
            {progress.currLevel}/{progress.totalLevel}
          </Text>
        </>
      </TouchableRipple>
    </Surface>
  );
};

const Tasks = [task1, task2, task3, task4, task5];

export const HomePage = ({ navigation }: any) => {
  const { height } = Dimensions.get("window");
  const taskProgress = useTaskProgress((s) => s);

  const totalTaskCompleted = 1;

  return (
    <ScrollView>
      <LinearGradient
        colors={[colors["blue-600"], colors["blue-400"]]}
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingBottom: 40,
          minHeight: height,
          alignItems: "center",
        }}
      >
        <IconButton
          icon="menu"
          onPress={navigation.openDrawer}
          iconColor={colors.white}
          style={{ marginRight: "auto", top: 10, left: -10 }}
        />
        <CircularProgress
          percent={totalTaskCompleted * 20}
          style={{ marginVertical: 20 }}
        >
          <>
            <Text
              style={{
                color: colors.white,
                fontSize: 40,
                lineHeight: 45,
              }}
            >
              {totalTaskCompleted}/5
            </Text>
            <Text variant="labelMedium" style={{ color: colors.white }}>
              Task Completed
            </Text>
          </>
        </CircularProgress>
        <Text
          variant="titleMedium"
          style={{ color: colors.white, lineHeight: 24, marginVertical: 10 }}
        >
          The complete assessment will take around 15 minutes.
        </Text>
        {Tasks.map((task, idx) => (
          <Tab
            key={idx}
            num={idx + 1}
            progress={
              taskProgress[
                `task${idx + 1}Progress` as keyof typeof taskProgress
              ]
            }
            navigate={navigation.navigate}
            {...task}
          />
        ))}
      </LinearGradient>
    </ScrollView>
  );
};

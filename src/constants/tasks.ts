import { colors } from "./AppStyle";
import { Progress } from "./progress";

export const task1 = {
  title: "Grid Task",
  color: colors["purple-400"],
  progress: Progress.COMPLETED,
  screen: "Task1",
  instructionImgSrc: require("../assets/images/task-1.png"),
};

export const task2 = {
  title: "Digit Span",
  color: colors["red-600"],
  progress: Progress.IN_PROGRESS,
  screen: "Task2",
  instructionImgSrc: require("../assets/images/task-2.png"),
};

export const task3 = {
  title: "Paired Association",
  color: colors["cyan-600"],
  progress: Progress.NOT_STARTED,
  screen: "Task3",
  instructionImgSrc: require("../assets/images/task-3.png"),
};

export const task4 = {
  title: "Word Recall",
  color: colors["indigo-500"],
  progress: Progress.NOT_STARTED,
  screen: "Task4",
  instructionImgSrc: require("../assets/images/task-4.png"),
};

export const task5 = {
  title: "Maze Game",
  color: colors["amber-800"],
  progress: Progress.NOT_STARTED,
  screen: "Task5",
  instructionImgSrc: require("../assets/images/task-5.png"),
};

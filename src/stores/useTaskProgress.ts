import create from "zustand";
import { combine } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as GameLevel from "../constants/GameLevel";

const taskProgressKey = "activity@cerebrus";
export const IntialProgress = [
  {
    name: "task1",
    currLevel: 0,
    totalLevel: GameLevel.task1Levels.length,
  },
  {
    name: "task2",
    currLevel: 0,
    totalLevel: GameLevel.task2Levels.length,
  },
  {
    name: "task3",
    currLevel: 0,
    totalLevel: GameLevel.task3Levels.length,
  },
  {
    name: "task4",
    currLevel: 0,
    totalLevel: GameLevel.task4Levels.length,
  },
  {
    name: "task5",
    currLevel: 0,
    totalLevel: GameLevel.task5Levels.length,
  },
];

export const useTaskProgress = create(
  combine({ taskProgress: IntialProgress }, (set, getState) => ({
    loadTaskProgress: async () => {
      try {
        const data = JSON.parse(
          (await AsyncStorage.getItem(taskProgressKey)) || ""
        );

        set(data);
      } catch (e) {
        console.log("loadTaskProgress e:", e);
      }
    },

    updateTaskProgress: (
      task: number,
      y: Partial<typeof IntialProgress[0]>
    ) => {
      task--;
      set(({ taskProgress }) => {
        taskProgress[task] = { ...getState().taskProgress[task], ...y };
        return { taskProgress };
      });

      try {
        AsyncStorage.setItem(taskProgressKey, JSON.stringify(getState()));
      } catch {}
    },

    resetTaskProgress: () => {
      set({ taskProgress: IntialProgress });
      try {
        AsyncStorage.setItem(taskProgressKey, "");
      } catch {}
    },
  }))
);

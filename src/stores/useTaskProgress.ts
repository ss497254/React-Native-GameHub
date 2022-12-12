import create from "zustand";
import { combine } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const taskProgressKey = "activity@cerebrus";
const IntialProgress = {
  task1Progress: { currLevel: 2, totalLevel: 7 },
  task2Progress: { currLevel: 5, totalLevel: 5 },
  task3Progress: { currLevel: 1, totalLevel: 5 },
  task4Progress: { currLevel: 0, totalLevel: 4 },
  task5Progress: { currLevel: 5, totalLevel: 8 },
} as const;

export const useTaskProgress = create(
  combine(IntialProgress, (set, getState) => ({
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

    updateTaskProgress: (task: keyof typeof IntialProgress, y: any) => {
      const newTask = { ...getState()[task], y };
      console.log(task, newTask);

      set({ [task]: newTask });

      try {
        AsyncStorage.setItem(taskProgressKey, JSON.stringify(getState()));
      } catch {}
    },

    resetTaskProgress: () => {
      try {
        AsyncStorage.setItem(taskProgressKey, JSON.stringify(IntialProgress));
      } catch {}
      set(IntialProgress);
    },
  }))
);

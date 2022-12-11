import create from "zustand";
import { combine } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Activity = {
  timestamp: number;
  message: string;
};

const activityKey = "activity@cerebrus";

export const useActivityLog = create(
  combine(
    {
      activities: [] as Activity[],
    },
    (set) => ({
      addActivity: (x: Activity) => {
        set((state) => ({ activities: [...state.activities, x] }));
      },
      clearActivityLog: () => {
        set({ activities: [] });
      },
    })
  )
);

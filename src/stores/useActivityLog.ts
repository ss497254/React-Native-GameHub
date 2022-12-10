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
        set((state) => {
          state.activities.push(x);
          AsyncStorage.setItem(
            activityKey,
            JSON.stringify(state.activities)
          ).catch();

          return { activities: state.activities };
        });
      },
      loadActivity: async () => {
        try {
          let activities = (await AsyncStorage.getItem(activityKey)) || "[]";

          if (activities && activities.startsWith("[")) {
            set((state) => ({
              activities: [
                ...(JSON.parse(activities) as Activity[]),
                ...state.activities,
              ],
            }));
          } else {
            set({ activities: [] });
          }
        } catch {}
      },
    })
  )
);

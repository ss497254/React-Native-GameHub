import create from "zustand";
import { combine } from "zustand/middleware";

export type Activity = {
  timestamp: number;
  message: string;
};

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

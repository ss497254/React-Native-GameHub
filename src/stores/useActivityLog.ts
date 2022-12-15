import create from "zustand";
import { combine } from "zustand/middleware";
import { addItem } from "../lib/firbase";
import { formatTimestamp } from "../utils/formatTimestamp";
import { useUserIdStore } from "./useUserIdStore";

export type Activity = {
  timestamp: string;
  message: string;
  userId?: string;
};

export const useActivityLog = create(
  combine(
    {
      activities: [] as Activity[],
    },
    (set) => ({
      addActivity: (message: string, timestamp: string = formatTimestamp()) => {
        set((state) => ({
          activities: [...state.activities, { message, timestamp }],
        }));

        const { userId } = useUserIdStore.getState();
        addItem("activity_log", { message, timestamp, userId });
      },
      clearActivityLog: () => {
        set({ activities: [] });
      },
    })
  )
);

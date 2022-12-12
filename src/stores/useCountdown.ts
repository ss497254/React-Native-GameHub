import create from "zustand";
import { combine } from "zustand/middleware";

export const useCountDown = create(
  combine(
    {
      countDown: "Ready",
    },
    (set) => ({
      startCountDown: (x: number) => {
        const timerId = setInterval(() => {
          x -= 1;
          if (x < 0) {
            clearInterval(timerId);
            set({ countDown: "" });
          } else {
            set({ countDown: x > 0 ? x.toString() : "Start" });
          }
        }, 1000);
        return () => {
          clearInterval(timerId);
          set({ countDown: "Ready" });
        };
      },
    })
  )
);

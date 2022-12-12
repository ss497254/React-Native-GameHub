import create from "zustand";
import { combine } from "zustand/middleware";

const intitalState = {
  countDown: "Ready",
};

let timerId: NodeJS.Timer;

export const useCountDown = create(
  combine(intitalState, (set) => ({
    startCountDown: (x: number) => {
      timerId = setInterval(() => {
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
        set(intitalState);
      };
    },
    clearCountDown: () => {
      clearInterval(timerId);
      set(intitalState);
    },
  }))
);

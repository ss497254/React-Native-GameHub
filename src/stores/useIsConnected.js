import create from "zustand";
import { combine } from "zustand/middleware";

export const useIsConnected = create(
  combine(
    {
      connected: true,
    },
    (set) => ({
      setConnected: (x) => {
        set(x);
      },
    })
  )
);

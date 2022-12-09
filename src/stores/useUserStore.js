import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { combine } from "zustand/middleware";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const userKey = "@creaitors/user";

export const useUserStore = create(
  combine(
    {
      user: { firstName: "Saurabh", lastName: "Singh" },
    },
    (set) => ({
      setUser: async (x) => {
        try {
          await AsyncStorage.setItem(userKey, JSON.stringify(x.user));
        } catch {}

        set({ user: x.user });
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem(userKey);
        } catch {}

        set({ user: null });
      },
    })
  )
);

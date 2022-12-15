import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { combine } from "zustand/middleware";

const userIdKey = "@creaitors/user";
const defaultUserId = "UserId is not added";

export const useUserIdStore = create(
  combine(
    {
      userId: defaultUserId,
    },
    (set) => ({
      loadUserId: async () => {
        try {
          const data = JSON.parse(
            (await AsyncStorage.getItem(userIdKey)) || ""
          );

          set(data);
        } catch {}
      },
      setUserId: async (x: { userId: string }) => {
        set(x);

        try {
          await AsyncStorage.setItem(userIdKey, JSON.stringify(x));
        } catch {}
      },
      logout: async () => {
        set({ userId: defaultUserId });

        try {
          await AsyncStorage.removeItem(userIdKey);
        } catch {}
      },
    })
  )
);

import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { Text, TextInput } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "react-query";
import { useNetworkStatus } from "./src/stores/useNetworkStatus";
import { toastConfig } from "./src/lib/defaultToastConfig";
import { queryClient } from "./src/lib/queryClient";
import { MainNavigator } from "./src/MainNavigator";
import { OfflineBar } from "./src/components/OfflineBar";
import { useTaskProgress } from "./src/stores/useTaskProgress";

if ((Text as any).defaultProps == null) {
  (Text as any).defaultProps = {};
  (Text as any).defaultProps.allowFontScaling = false;
}

if ((TextInput as any).defaultProps == null) {
  (TextInput as any).defaultProps = {};
  (TextInput as any).defaultProps.allowFontScaling = false;
}

const App = () => {
  const { setConnected } = useNetworkStatus((s) => s);
  const { loadTaskProgress } = useTaskProgress((s) => s);

  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./src/assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      loadTaskProgress();
    }

    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected, isInternetReachable } = state;

      //@ts-ignore
      setConnected({ isInternetReachable, isConnected });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView />
        <MainNavigator />
        <Toast
          config={toastConfig}
          onPress={() => Toast.hide()}
          visibilityTime={5000}
          autoHide
        />
        <OfflineBar />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;

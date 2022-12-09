import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { StatusBar, Text, TextInput } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "react-query";
import { useIsConnected } from "./src/stores/useIsConnected";
import { toastConfig } from "./src/lib/defaultToastConfig";
import { queryClient } from "./src/lib/queryClient";
import { Main } from "./src/Main";

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const App = () => {
  const { connected, setConnected } = useIsConnected((s) => s);

  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./src/assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected, isInternetReachable } = state;

      setConnected({ connected: isInternetReachable && isConnected });
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
        <Main />
        <Toast
          config={toastConfig}
          onPress={() => Toast.hide()}
          visibilityTime={5000}
          autoHide
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;

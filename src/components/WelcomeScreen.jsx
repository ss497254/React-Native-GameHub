import PaperOnboarding from "./OnBoardingScreen";
import { Image } from "react-native";
import { colors } from "../constants/appStyle";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const data = [
  {
    title: "CREaiTORS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundColor: colors["blue-500"],
    image: (
      <Image
        source={require("../assets/icon.png")}
        style={{ height: 170, width: 170 }}
      />
    ),
  },
  {
    title: "Health",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    backgroundColor: colors["deep-orange-400"],
  },
  {
    title: "Technology",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    backgroundColor: colors["cyan-600"],
  },
];

export const WelcomeScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperOnboarding
        data={data}
        indicatorSize={14}
        titleStyle={{ fontFamily: "Inter-Regular" }}
        descriptionStyle={{ fontFamily: "Inter-Regular", fontSize: 14 }}
        closeButton={
          <View
            style={{
              position: "absolute",
              position: "absolute",
              bottom: -height + 105,
              right: -12,
              width,
              alignItems: "center",
            }}
          >
            <Button
              mode="outlined"
              contentStyle={{
                height: 45,
                width: width / 1.25,
                backgroundColor: "white",
                flexDirection: "row-reverse",
              }}
              style={{ borderWidth: 0 }}
              onPress={() => navigation.navigate("Landing")}
              icon="arrow-right-thick"
            >
              Get Started
            </Button>
          </View>
        }
      />
    </GestureHandlerRootView>
  );
};

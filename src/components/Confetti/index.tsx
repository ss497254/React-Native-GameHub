import * as React from "react";
import { Animated, Dimensions, Easing, Platform, View } from "react-native";
import { Confetti } from "./Confetti";
import { randomColor, randomValue } from "./utils";

type Props = {
  count: number;
  origin: {
    x: number;
    y: number;
  };
  explosionSpeed?: number;
  fallSpeed?: number;
  colors?: Array<string>;
  fadeOut?: boolean;
  autoStart?: boolean;
  autoStartDelay?: number;
  children: React.ReactNode;
};

type Item = {
  leftDelta: number;
  topDelta: number;
  swingDelta: number;
  speedDelta: {
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
  color: string;
};

type State = {
  items: Array<Item>;
};

export const TOP_MIN = 0.7;
export const DEFAULT_COLORS: Array<string> = [
  "#ffebee",
  "#ffcdd2",
  "#ef9a9a",
  "#e57373",
  "#ef5350",
  "#f44336",
  "#e53935",
  "#d32f2f",
  "#c62828",
  "#b71c1c",
  "#e91e63",
  "#fce4ec",
  "#f8bbd0",
  "#f48fb1",
  "#f06292",
  "#ec407a",
  "#e91e63",
  "#d81b60",
  "#c2185b",
  "#ad1457",
  "#880e4f",
  "#9c27b0",
  "#f3e5f5",
  "#e1bee7",
  "#ce93d8",
  "#ba68c8",
  "#ab47bc",
  "#9c27b0",
  "#8e24aa",
  "#7b1fa2",
  "#6a1b9a",
  "#4a148c",
  "#3f51b5",
  "#e8eaf6",
  "#c5cae9",
  "#9fa8da",
  "#7986cb",
  "#5c6bc0",
  "#3f51b5",
  "#3949ab",
  "#303f9f",
  "#283593",
  "#1a237e",
  "#2196f3",
  "#EBF5FF",
  "#E1EFFE",
  "#C3DDFD",
  "#A4CAFE",
  "#76A9FA",
  "#3F83F8",
  "#1C64F2",
  "#1A56DB",
  "#1E429F",
  "#233876",
  "#e3f2fd",
  "#bbdefb",
  "#90caf9",
  "#64b5f6",
  "#42a5f5",
  "#2196f3",
  "#1e88e5",
  "#1976d2",
  "#1565c0",
  "#0d47a1",
  "#03a9f4",
  "#e1f5fe",
  "#b3e5fc",
  "#81d4fa",
  "#4fc3f7",
  "#29b6f6",
  "#03a9f4",
  "#039be5",
  "#0288d1",
  "#0277bd",
  "#01579b",
  "#00bcd4",
  "#e0f7fa",
  "#b2ebf2",
  "#80deea",
  "#4dd0e1",
  "#26c6da",
  "#00bcd4",
  "#00acc1",
  "#0097a7",
  "#00838f",
  "#006064",
  "#009688",
  "#e0f2f1",
  "#b2dfdb",
  "#80cbc4",
  "#4db6ac",
  "#26a69a",
  "#009688",
  "#00897b",
  "#00796b",
  "#00695c",
  "#004d40",
  "#4caf50",
  "#F3FAF7",
  "#DEF7EC",
  "#BCF0DA",
  "#84E1BC",
  "#31C48D",
  "#0E9F6E",
  "#057A55",
  "#046C4E",
  "#03543F",
  "#014737",
  "#e8f5e9",
  "#c8e6c9",
  "#a5d6a7",
  "#81c784",
  "#66bb6a",
  "#4caf50",
  "#43a047",
  "#388e3c",
  "#2e7d32",
  "#1b5e20",
  "#8bc34a",
  "#f1f8e9",
  "#dcedc8",
  "#c5e1a5",
  "#aed581",
  "#9ccc65",
  "#8bc34a",
  "#7cb342",
  "#689f38",
  "#558b2f",
  "#33691e",
  "#cddc39",
  "#f9fbe7",
  "#f0f4c3",
  "#e6ee9c",
  "#dce775",
  "#d4e157",
  "#cddc39",
  "#c0ca33",
  "#afb42b",
  "#9e9d24",
  "#827717",
  "#ffeb3b",
  "#fffde7",
  "#fff9c4",
  "#fff59d",
  "#fff176",
  "#ffee58",
  "#ffeb3b",
  "#fdd835",
  "#fbc02d",
  "#f9a825",
  "#f57f17",
  "#ffc107",
  "#fff8e1",
  "#ffecb3",
  "#ffe082",
  "#ffd54f",
  "#ffca28",
  "#ffc107",
  "#ffb300",
  "#ffa000",
  "#ff8f00",
  "#ff6f00",
  "#ff9800",
  "#fff3e0",
  "#ffe0b2",
  "#ffcc80",
  "#ffb74d",
  "#ffa726",
  "#ff9800",
  "#fb8c00",
  "#f57c00",
  "#ef6c00",
  "#e65100",
  "#ff5722",
  "#fbe9e7",
  "#ffccbc",
  "#ffab91",
  "#ff8a65",
  "#ff7043",
  "#ff5722",
  "#f4511e",
  "#e64a19",
  "#d84315",
  "#bf360c",
  "#795548",
  "#efebe9",
  "#d7ccc8",
  "#bcaaa4",
  "#a1887f",
  "#8d6e63",
  "#795548",
  "#6d4c41",
  "#5d4037",
  "#4e342e",
  "#3e2723",
  "#9e9e9e",
  "#fafafa",
  "#f5f5f5",
  "#eeeeee",
  "#e0e0e0",
  "#bdbdbd",
  "#9e9e9e",
  "#757575",
  "#616161",
  "#424242",
  "#212121",
  "#e67e22",
  "#2ecc71",
  "#3498db",
  "#84AAC2",
  "#E6D68D",
  "#F67933",
  "#42A858",
  "#4F50A2",
  "#A86BB7",
  "#e74c3c",
  "#1abc9c",
];

export const DEFAULT_EXPLOSION_SPEED = 350;
export const DEFAULT_FALL_SPEED = 3000;

const getItems = (count: number, colors: string[]): Array<Item> => {
  return Array(count)
    .fill(0)
    .map(
      (): Item => ({
        leftDelta: randomValue(0, 1),
        topDelta: randomValue(TOP_MIN, 1),
        swingDelta: randomValue(0.2, 1),
        speedDelta: {
          rotateX: randomValue(0.3, 1),
          rotateY: randomValue(0.3, 1),
          rotateZ: randomValue(0.3, 1),
        },
        color: randomColor(colors),
      })
    )
    .map((item) => ({
      ...item,
      color: randomColor(colors),
    }));
};

export default function Explosion({
  origin,
  fadeOut,
  count,
  colors = DEFAULT_COLORS,
  explosionSpeed = DEFAULT_EXPLOSION_SPEED,
  fallSpeed = DEFAULT_FALL_SPEED,
  children,
}: Props) {
  const { height, width } = Dimensions.get("window");
  const animation = React.useRef(new Animated.Value(0)).current;
  const [{ items }, _] = React.useState<State>({
    items: getItems(count, colors),
  });

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: explosionSpeed,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 2,
        duration: fallSpeed,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((item: Item, index: number) => {
        const left = animation.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [
            origin.x,
            item.leftDelta * width,
            item.leftDelta * width,
          ],
        });
        const top = animation.interpolate({
          inputRange: [0, 1, 1 + item.topDelta, 2],
          outputRange: [-origin.y, -item.topDelta * height, 0, 0],
        });
        const rotateX = animation.interpolate({
          inputRange: [0, 2],
          outputRange: ["0deg", `${item.speedDelta.rotateX * 360 * 10}deg`],
        });
        const rotateY = animation.interpolate({
          inputRange: [0, 2],
          outputRange: ["0deg", `${item.speedDelta.rotateY * 360 * 5}deg`],
        });
        const rotateZ = animation.interpolate({
          inputRange: [0, 2],
          outputRange: ["0deg", `${item.speedDelta.rotateZ * 360 * 2}deg`],
        });
        const translateX = animation.interpolate({
          inputRange: [0, 0.4, 1.2, 2],
          outputRange: [0, -(item.swingDelta * 30), item.swingDelta * 30, 0],
        });
        const opacity = animation.interpolate({
          inputRange: [0, 1, 1.8, 2],
          outputRange: [1, 1, 1, fadeOut ? 0 : 1],
        });
        const containerTransform = [{ translateX: left }, { translateY: top }];
        const transform = [
          { rotateX },
          { rotateY },
          { rotate: rotateZ },
          { translateX },
        ];

        if (Platform.OS === "android") {
          //@ts-ignore
          transform.push({ perspective: 100 });
        }

        return (
          <Confetti
            color={item.color}
            containerTransform={containerTransform}
            transform={transform}
            opacity={opacity}
            key={index}
            testID={`confetti-${index + 1}`}
          />
        );
      })}
      {children}
    </View>
  );
}

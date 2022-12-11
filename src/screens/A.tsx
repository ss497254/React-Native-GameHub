import { Text } from "react-native-paper";
import { View } from "react-native";
import * as React from "react";

export default function CountDownTimer({ initialValue }: any) {
  const [time, setTime] = React.useState(initialValue || 10);
  const timerRef = React.useRef(time);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text> {time} </Text>
    </View>
  );
}

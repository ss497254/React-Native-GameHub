import * as React from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from "react-native";
import { colors } from "../constants/AppStyle";

export type Props = React.ComponentPropsWithRef<typeof View> & {
  progress?: number;
  color?: string;
  bgColor?: string;
  indeterminate?: boolean;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
};

const INDETERMINATE_DURATION = 2000;
const INDETERMINATE_MAX_WIDTH = 0.6;

/**
 * Progress bar is an indicator used to present progress of some activity in the app.
 *
 * <div class="screenshots">
 *   <img src="screenshots/progress-bar.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ProgressBar, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ProgressBar progress={0.5} color={MD3Colors.error50} />
 * );
 *
 * export default MyComponent;
 * ```
 */
export const ProgressBar = ({
  color = colors["blue-500"],
  bgColor = colors["blue-200"],
  indeterminate,
  style,
  progress = 0,
  visible = true,
  ...rest
}: Props) => {
  const { current: timer } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );
  const { current: fade } = React.useRef<Animated.Value>(new Animated.Value(0));
  const [width, setWidth] = React.useState<number>(0);
  const [prevWidth, setPrevWidth] = React.useState<number>(0);

  const indeterminateAnimation =
    React.useRef<Animated.CompositeAnimation | null>(null);

  const startAnimation = React.useCallback(() => {
    // Show progress bar
    Animated.timing(fade, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
      isInteraction: false,
    }).start();

    // Animate progress bar
    if (indeterminate) {
      if (!indeterminateAnimation.current) {
        indeterminateAnimation.current = Animated.timing(timer, {
          duration: INDETERMINATE_DURATION,
          toValue: 1,
          // Animated.loop does not work if useNativeDriver is true on web
          useNativeDriver: Platform.OS !== "web",
          isInteraction: false,
        });
      }

      // Reset timer to the beginning
      timer.setValue(0);

      Animated.loop(indeterminateAnimation.current).start();
    } else {
      Animated.timing(timer, {
        duration: 200,
        toValue: progress ? progress : 0,
        useNativeDriver: true,
        isInteraction: false,
      }).start();
    }
  }, [timer, progress, indeterminate, fade]);

  const stopAnimation = React.useCallback(() => {
    // Stop indeterminate animation
    if (indeterminateAnimation.current) {
      indeterminateAnimation.current.stop();
    }

    Animated.timing(fade, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }, [fade]);

  React.useEffect(() => {
    if (visible) startAnimation();
    else stopAnimation();
  }, [visible, startAnimation, stopAnimation]);

  React.useEffect(() => {
    // Start animation the very first time when previously the width was unclear
    if (visible && prevWidth === 0) {
      startAnimation();
    }
  }, [prevWidth, startAnimation, visible]);

  const onLayout = (event: LayoutChangeEvent) => {
    setPrevWidth(width);
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <Animated.View
      style={[
        {
          backgroundColor: bgColor,
          opacity: fade,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.progressBar,
          {
            width,
            backgroundColor: color,
            transform: [
              {
                translateX: timer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-1 * 0.5 * width, 0],
                }),
              },
              {
                scaleX: timer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.0001, 1],
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
  },
});

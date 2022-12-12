import React, { Children } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../constants/AppStyle";
/**
 * Override styles that get passed from props
 **/
const propStyle = (percent: number, base_degrees: number) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const renderThirdLayer = (percent: number) => {
  if (percent > 50) {
    /**
     * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the propStyle function
     **/
    return (
      <View
        style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
      ></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

const CircularProgress = ({
  percent,
  children,
  style,
}: {
  percent: number;
  children: React.ReactElement;
  style: ViewStyle;
}) => {
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    position: "relative",
    borderWidth: 12,
    borderRadius: 200,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  firstProgressLayer: {
    width: 180,
    height: 180,
    borderWidth: 12,
    borderRadius: 200,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: colors["green-400"],
    borderTopColor: colors["green-400"],
    transform: [{ rotateZ: "-135deg" }],
  },
  secondProgressLayer: {
    width: 180,
    height: 180,
    position: "absolute",
    borderWidth: 12,
    borderRadius: 200,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: colors["green-400"],
    borderTopColor: colors["green-400"],
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: 180,
    height: 180,
    position: "absolute",
    borderWidth: 12,
    borderRadius: 200,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: colors.white,
    borderTopColor: colors.white,
    transform: [{ rotateZ: "-135deg" }],
  },
});

export default CircularProgress;

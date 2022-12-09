import { Image, ScrollView, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { colors } from "../constants/appStyle";

export const MoodItem = ({ source, error, title, onPress, mood }) => {
  return (
    <TouchableRipple
      style={{
        marginHorizontal: 4,
        marginVertical: 8,
        borderRadius: 20,
        ...(error && { borderColor: colors["red-500"], borderWidth: 0.6 }),
      }}
      onPress={() => onPress(title)}
      borderless
    >
      <View
        style={{
          height: 105,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            mood === title ? colors["blue-300"] : colors["gray-200"],
        }}
      >
        <Image style={{ height: 38, width: 38 }} source={source} />
        <Text style={{ paddingTop: 10 }}>{title}</Text>
      </View>
    </TouchableRipple>
  );
};

export const MoodContainer = ({ children, style }) => (
  <View
    style={[
      {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      style,
    ]}
  >
    {children}
  </View>
);

const moods = [
  { title: "Happy", source: require("../assets/images/smile.png") },
  { title: "Sad", source: require("../assets/images/sad.png") },
  { title: "Angry", source: require("../assets/images/angry.png") },
  { title: "Irritated", source: require("../assets/images/irritated.png") },
  { title: "Anxious", source: require("../assets/images/anxious.png") },
  { title: "Quiet", source: require("../assets/images/quiet.png") },
];

export const MoodController = ({ mood, setMood, error }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        justifyContent: "space-evenly",
      }}
    >
      {moods.map((md, index) => (
        <MoodItem
          key={index}
          title={md.title}
          source={md.source}
          error={error}
          mood={mood}
          onPress={setMood}
        />
      ))}
    </ScrollView>
  );
};

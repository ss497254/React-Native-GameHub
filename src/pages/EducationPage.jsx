import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../constants/appStyle";
import { YoutubeVideoCard } from "../components/YoutubeVideoCard";

const youtubeVideos = [
  {
    videoId: "hahvUXwTXE4",
    title:
      "Caregiver Training: Agitation and Anxiety | UCLA Alzheimer's and Dementia Care Program",
  },
  {
    videoId: "HobxLbPhrMc",
    title: "What is dementia? Alzheimer's Research UK",
  },
  {
    videoId: "1EGhhZdQ_ts",
    title:
      "Understanding, Accepting, and Appreciating a Person Living with Dementia with Teepa Snow",
  },
];

export const EducationPage = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: "100%",
        backgroundColor: colors["blue-200"],
        padding: 15,
      }}
    >
      <Text variant="titleLarge" style={{ marginVertical: 20 }}>
        Popular videos
      </Text>
      {youtubeVideos.map((video, i) => (
        <YoutubeVideoCard videoId={video.videoId} key={i} title={video.title} />
      ))}
    </ScrollView>
  );
};

import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import {
  Text,
  TouchableRipple,
  IconButton,
  TextInput,
  Button,
} from "react-native-paper";
import { showToast } from "../lib/showToast";
import { colors } from "../constants/appStyle";
import { Modal } from "./CustomModal";

const generateIcon = (str) => {
  str = str.trim();
  const split = str.split(" ");

  if (split.length > 1) return (split[0][0] + split[1][0]).toUpperCase();

  return str[0].toUpperCase() + str[1];
};

const EventItem = ({ source, title, events, setEvents, error }) => {
  const active = events.indexOf(title) !== -1;

  return (
    <TouchableRipple
      style={{
        marginHorizontal: 4,
        marginVertical: 8,
        borderRadius: 20,
        ...(error && { borderColor: colors["red-500"], borderWidth: 0.6 }),
      }}
      onPress={() => {
        if (!active) {
          setEvents([...events, title]);
        } else {
          setEvents(events.filter((item) => item !== title));
        }
      }}
      borderless
    >
      <View
        style={{
          height: 105,
          width: 100,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: active ? colors["blue-300"] : colors["gray-200"],
        }}
      >
        {source ? (
          <Image
            style={{ marginBottom: 10, height: 38, width: 38 }}
            source={source}
          />
        ) : (
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 100,
              backgroundColor: active ? colors["blue-400"] : colors["gray-300"],
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: active ? colors.text : colors.textDark,
              }}
            >
              {generateIcon(title)}
            </Text>
          </View>
        )}
        {title
          .split(" ")
          .splice(0, 2)
          .map((val, idx) => (
            <Text
              key={idx}
              style={{
                fontSize: 12,
                flexShrink: 1,
                marginBottom: -2,
              }}
            >
              {val.length > 14 ? val.substr(0, 14) : val}
            </Text>
          ))}
      </View>
    </TouchableRipple>
  );
};

export const defaultEvents = [
  {
    title: "Delusions",
    source: require("../assets/images/delusion.png"),
  },
  {
    title: "Hallucinations",
    source: require("../assets/images/hallucination.png"),
  },
  {
    title: "Violence",
    source: require("../assets/images/violence.png"),
  },
  {
    title: "Withdrawal",
    source: require("../assets/images/withdrawal.png"),
  },
  {
    title: "Wandering",
    source: require("../assets/images/wandering.png"),
  },
  {
    title: "Eating problems",
    source: require("../assets/images/appetite.png"),
  },
  {
    title: "Unusual behaviour",
    source: require("../assets/images/unusal_behaviour.png"),
  },
];

export const EventController = ({
  events = [],
  setEvents = (_) => {},
  error,
  updateEventList = [],
}) => {
  const [eventList, setEventList] = useState(defaultEvents);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");

  useEffect(() => {
    let extraEvents = [];

    updateEventList.forEach((element) => {
      if (!defaultEvents.find((y) => y.title === element))
        extraEvents.push({ title: element });
    });

    if (extraEvents.length) setEventList([...defaultEvents, ...extraEvents]);
  }, [updateEventList]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 10,
          justifyContent: "space-evenly",
        }}
      >
        {eventList.map((event, index) => (
          <EventItem
            key={index}
            source={event.source}
            icon={event.icon}
            events={events}
            error={error}
            title={event.title}
            setEvents={setEvents}
          />
        ))}
        <TouchableRipple
          style={{
            height: 105,
            width: 100,
            backgroundColor: colors["gray-200"],
            borderRadius: 20,
            justifyContent: "center",
            margin: 8,
            alignItems: "center",
          }}
          onPress={() => setModalOpen(true)}
        >
          <>
            <IconButton
              icon="plus"
              mode="contained"
              theme={{
                colors: {
                  primary: colors.textDark,
                },
              }}
              style={{ marginTop: -5, backgroundColor: colors["gray-300"] }}
              size={33}
            />
            <Text style={{ fontSize: 13, flexShrink: 1 }}>Add</Text>
          </>
        </TouchableRipple>
      </ScrollView>
      <Modal
        visible={modalOpen}
        setVisible={setModalOpen}
        title="Add new event"
        footerContent={
          <Button
            mode="contained"
            onPress={() => {
              if (newEventTitle.length > 2) {
                setEventList([...eventList, { title: newEventTitle }]);
                setNewEventTitle("");
                setModalOpen(!modalOpen);
              } else {
                showToast("invalid event", "error");
              }
            }}
          >
            Add Event
          </Button>
        }
      >
        <Text>Event should not be more than 3 words</Text>
        <TextInput
          mode="outlined"
          theme={{
            roundness: 10,
          }}
          style={{ borderRadius: 100, marginVertical: 12 }}
          label="Event"
          placeholder="Enter event"
          value={newEventTitle}
          onChangeText={setNewEventTitle}
        />
      </Modal>
    </>
  );
};

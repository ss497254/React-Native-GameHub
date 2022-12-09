import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Checkbox, DataTable, Text, TouchableRipple } from "react-native-paper";
import { colors } from "../constants/appStyle";

export const LogTableRow = ({ log, handleSelectOne, selectedLogIds }) => {
  const navigation = useNavigation();
  const active = selectedLogIds.indexOf(log.id) !== -1;
  const onPress = () => {
    navigation.navigate("EditLogs", { log, id: log.id });
  };

  return (
    <DataTable.Row
      key={log.id}
      style={{
        minHeight: 80,
        backgroundColor: active ? colors["blue-100"] : colors.white,
      }}
    >
      <View
        style={{
          width: 50,
          justifyContent: "center",
        }}
      >
        <Checkbox.Android
          status={active ? "checked" : "unchecked"}
          onPress={() => handleSelectOne(log.id)}
          value="true"
        />
      </View>
      <TouchableRipple onPress={onPress}>
        <DataTable.Cell
          style={{
            width: 50,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {log.id}
          </Text>
        </DataTable.Cell>
      </TouchableRipple>
      <TouchableRipple onPress={onPress}>
        <DataTable.Cell
          style={{
            width: 100,
            paddingLeft: 20,
          }}
        >
          <Text>{log.mood}</Text>
        </DataTable.Cell>
      </TouchableRipple>
      <TouchableRipple onPress={onPress}>
        <View
          style={{
            justifyContent: "center",
            height: "100%",
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              width: 220,
              paddingHorizontal: 10,
              textAlignVertical: "center",
            }}
            variant="labelLarge"
          >
            {log.event && log.event.join(",  ")}
          </Text>
        </View>
      </TouchableRipple>
      <DataTable.Cell style={{ width: 135 }}>
        <Text style={{ textAlignVertical: "center" }}>
          {new Date(log.eventDate).toDateString()}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell
        style={{
          justifyContent: "center",
          width: 80,
        }}
      >
        <Text
          style={{
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          {log.stressLevel}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={{ width: 280 }}>
        <Text style={{ textAlignVertical: "center" }}>
          {log.description === "" ? "No description" : log.description}
        </Text>
      </DataTable.Cell>
      {/* <TouchableRipple onPress={onPress}>
        <Text
          style={{
            width: 50,
            height: "100%",
            paddingHorizontal: 10,
            textAlignVertical: "center",
          }}
          variant="labelLarge"
        >
          {log.id}
        </Text>
      </TouchableRipple>
      <TouchableRipple onPress={onPress}>
        <Text
          style={{
            width: 100,
            height: "100%",
            paddingLeft: 20,
            textAlignVertical: "center",
          }}
          variant="labelLarge"
        >
          {log.mood}
        </Text>
      </TouchableRipple>
      <TouchableRipple onPress={onPress}>
        <Text
          style={{
            width: 220,
            height: "100%",
            paddingHorizontal: 10,
            textAlignVertical: "center",
          }}
          variant="labelLarge"
        >
          {log.event && log.event.join(",  ")}
        </Text>
      </TouchableRipple> */}
    </DataTable.Row>
  );
};

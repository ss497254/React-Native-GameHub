import React from "react";
import { DataTable, Text } from "react-native-paper";
import { colors } from "../constants/appStyle";
import { View } from "react-native";

export const NPIqTable = () => {
  return (
    <DataTable>
      <DataTable.Row
        style={{
          backgroundColor: colors["blue-500"],
          // justifyContent: "center",
          minHeight: 65,
          // alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 3,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
            }}
            variant="labelLarge"
          >
            Symptom
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
            }}
            variant="labelLarge"
          >
            Severity
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
            }}
            variant="labelLarge"
          >
            Caregiver Stress
          </Text>
        </View>
      </DataTable.Row>
      <DataTable.Row>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 3 }}>
          Agitation
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          1
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          1
        </Text>
      </DataTable.Row>
      <DataTable.Row>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 3 }}>
          Anxiety
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          1
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          2
        </Text>
      </DataTable.Row>
      <DataTable.Row>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 3 }}>
          Aberrant Motor Behavior
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          3
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          4
        </Text>
      </DataTable.Row>
      <DataTable.Row>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 3 }}>
          Nighttime Behavior
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          3
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          5
        </Text>
      </DataTable.Row>
      <DataTable.Row
        style={{
          backgroundColor: colors["gray-200"],
          borderTopColor: colors["gray-600"],
          borderTopWidth: 0.5,
        }}
      >
        <Text
          variant="labelLarge"
          style={{
            paddingVertical: 20,
            flex: 3,
          }}
        >
          Total
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          8
        </Text>
        <Text variant="labelLarge" style={{ paddingVertical: 20, flex: 2 }}>
          12
        </Text>
      </DataTable.Row>
    </DataTable>
  );
};

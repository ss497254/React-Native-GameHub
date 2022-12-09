import { Alert, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, ProgressBar, Surface, Text, Title } from "react-native-paper";
import { FitbitIntegrationBanner } from "../components/FitbitIntegrationBanner";
import { NPIqTable } from "../components/NPIqTable";
import { colors, radius } from "../constants/appStyle";

export const HomePage = () => {
  return (
    <>
      <FitbitIntegrationBanner />
      <ScrollView>
        <Surface
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            backgroundColor: colors.white,
            borderRadius: radius.m,
          }}
        >
          <View
            style={{
              paddingHorizontal: 24,
              borderBottomColor: colors["gray-600"],
              borderBottomWidth: 0.5,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <Text variant={"headlineSmall"}>Condensed Insights</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Behaviour</Text>
            <Text variant="bodyMedium" style={{ color: colors["blue-600"] }}>
              Wandering
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginTop: 15,
              }}
            >
              <Text style={{ fontWeight: "500" }}>Time:</Text> Afternoon (4 -
              4:30) (83%)
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginTop: 5,
              }}
            >
              <Text style={{ fontWeight: "500" }}>Stress:</Text> 8/10 (highly
              stressfull)
            </Text>
            <ProgressBar progress={0.8} style={{ marginVertical: 20 }} />
          </View>
        </Surface>
        <Surface
          style={{
            marginHorizontal: 10,
            marginBottom: 20,
            backgroundColor: colors.white,
            borderRadius: radius.m,
          }}
        >
          <View
            style={{
              paddingHorizontal: 24,
              borderBottomColor: colors["gray-600"],
              borderBottomWidth: 0.5,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <Text variant="headlineSmall">NPI-Q</Text>
            {/* <Text
          style={{
            fontSize: 13,
            marginTop: -5,
            color: colors["gray-600"],
            fontWeight: "400",
          }}
        >
          The Information can be edited
        </Text> */}
          </View>
          <NPIqTable />
          <View
            style={{
              flexDirection: "row-reverse",
              paddingHorizontal: 15,
              borderTopColor: colors["gray-600"],
              borderTopWidth: 0.5,
              paddingVertical: 12,
            }}
          >
            <Button
              mode="contained"
              style={{ width: 140 }}
              contentStyle={{
                flexDirection: "row-reverse",
              }}
              onPress={() => {
                Alert.alert("Sorry", "We are still working on this");
              }}
              labelStyle={{ fontSize: 16, color: colors.text }}
            >
              Details
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </>
  );
};

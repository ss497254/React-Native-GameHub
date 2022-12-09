import { Alert, Image, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { colors, radius } from "../../constants/appStyle";
import { useUserStore } from "../../stores/useUserStore";

export const ProfilePictureCard = () => {
  const { user } = useUserStore((s) => s);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: colors.white,
        borderRadius: radius.m,
      }}
    >
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={
            user.avatarUrl && user.avatarUrl !== "#"
              ? { uri: user.avatarUrl }
              : require("../../assets/images/profile.png")
          }
          style={{ width: 140, height: 140, borderRadius: 200 }}
        />
      </View>
      <Text
        style={{
          marginTop: 10,
          textAlign: "center",
          fontSize: 25,
          fontWeight: "600",
        }}
      >
        {user.firstName + " " + user.lastName}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          marginBottom: 15,
          fontWeight: "300",
        }}
      >
        {user.role}
      </Text>
      <TouchableRipple
        onPress={() => {
          Alert.alert("Sorry", "We are still working on this");
        }}
        style={{ borderTopColor: colors["gray-600"], borderTopWidth: 0.5 }}
      >
        <Text
          style={{
            textAlign: "center",
            paddingVertical: 14,
            fontSize: 17,
          }}
          variant="labelLarge"
        >
          Upload picture
        </Text>
      </TouchableRipple>
    </View>
  );
};

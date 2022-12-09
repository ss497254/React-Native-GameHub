import { ScrollView } from "react-native";
import { FitbitUpdateCard } from "../components/Profile/FitbitUpdateCard";
import { LogoutCard } from "../components/Profile/LogoutCard";
import { ProfileDetails } from "../components/Profile/ProfileDetails";
import { ProfilePictureCard } from "../components/Profile/ProfilePictureCard";

export const ProfilePage = () => {
  return (
    <ScrollView>
      <ProfilePictureCard />
      <ProfileDetails />
      <FitbitUpdateCard />
      <LogoutCard />
    </ScrollView>
  );
};

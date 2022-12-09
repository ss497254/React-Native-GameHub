import React from "react";
import { useUserStore } from "../stores/useUserStore";
import { LandingNavigator } from "./LandingNavigator";
import { MainNavigator } from "./MainNavigator";

export const AuthenticationSwitch = () => {
  const isLoggedIn = useUserStore((s) => !!s.user);

  if (!isLoggedIn) {
    return <LandingNavigator />;
  }
  return <MainNavigator />;
};

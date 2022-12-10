import {
  NavigationContainerRef,
  ParamListBase,
  RouteProp,
  StackActions,
} from "@react-navigation/native";
import * as React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// This allow to get route and navigation props

export interface DrawerNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: DrawerNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

// This allow to call navigation from outside a Navigator. Usefull for floating RoomController

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name, params = {}) {
  navigationRef.current?.dispatch(StackActions.popToTop());
  navigationRef.current?.navigate(name, params);
}

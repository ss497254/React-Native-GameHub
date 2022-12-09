import React from "react";
import { colors } from "../constants/appStyle";
import { RoutinePage } from "./RoutinePage";
import { LogsPage } from "./LogsPage";
import { ProfilePage } from "./ProfilePage";
import { HomePage } from "./HomePage";
import { BottomNavigation, Text } from "react-native-paper";

export const MainPage = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "Home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
      color: colors.accent,
    },
    {
      key: "Logs",
      title: "Logs",
      focusedIcon: "clipboard-edit",
      unfocusedIcon: "clipboard-edit-outline",
    },
    { key: "History", title: "History", focusedIcon: "history" },
    {
      key: "Profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: HomePage,
    Logs: LogsPage,
    History: RoutinePage,
    Profile: ProfilePage,
  });

  return (
    <BottomNavigation
      activeColor={colors["blue-400"]}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      sceneAnimationEnabled
      sceneAnimationType="shifting"
      renderScene={renderScene}
      style={{
        color: colors.accent,
        tintColor: colors.accent,
        fontFamily: "Inter-Regular",
      }}
      barStyle={{
        backgroundColor: colors.white,
        color: colors["blue-500"],
        borderTopWidth: 0.5,
        borderTopColor: colors["gray-300"],
        fontFamily: "Inter-Regular",
      }}
    />
  );
};

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Image, Text, View, TouchableOpacity } from "react-native";

// const Tab = createBottomTabNavigator();

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         height: 60,
//         borderTopColor: colors["gray-500"],
//         backgroundColor: colors.white,
//         borderTopWidth: 0.2,
//       }}
//     >
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];

//         let icon = require("../assets/images/smile.png");
//         if (route.name === "Logs") {
//           icon = require("../assets/images/angry.png");
//         } else if (route.name === "Routine") {
//           icon = require("../assets/images/sad.png");
//         } else if (route.name === "Profile") {
//           icon = require("../assets/images/quiet.png");
//         }

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({ name: route.name, merge: true });
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: "tabLongPress",
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             key={index}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 paddingVertical: 10,
//               }}
//             >
//               <Image source={icon} style={{ width: 25, height: 25 }} />
//               <Text
//                 style={{
//                   color: isFocused ? colors["blue-600"] : "#222",
//                   fontSize: 12,
//                 }}
//               >
//                 {route.name}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// export const MainPage = () => {
//   return (
//     <Tab.Navigator tabBar={MyTabBar}>
//       <Tab.Screen
//         name="Home"
//         options={{ headerShown: false }}
//         component={HomePage}
//       />
//       <Tab.Screen
//         name="Logs"
//         options={{ headerShown: false }}
//         component={LogsPage}
//       />
//       <Tab.Screen
//         name="Routine"
//         options={{ headerShown: false }}
//         component={RoutinePage}
//       />
//       <Tab.Screen
//         name="Profile"
//         options={{ headerShown: false }}
//         component={ProfilePage}
//       />
//     </Tab.Navigator>
//   );
// };

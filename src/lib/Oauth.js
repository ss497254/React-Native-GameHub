import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";
import { Alert } from "react-native";

const AddListner = (cb) => {
  Linking.removeAllListeners("url");

  Linking.addEventListener("url", (event) => {
    Linking.removeAllListeners("url");
    cb(event);
    console.log(event);
  });
};

export const Oauth = async (url, cb = () => {}) => {
  AddListner(cb);

  // if (Linking.canOpenURL(url)) {
  //   Linking.openURL(url);
  //   cb();
  // } else {
  //   Alert.alert("Sorry", "Unable to open browswer");
  //   cb();
  // }
  const x = await WebBrowser.openAuthSessionAsync(url, "cece://", {});
  if (x.type === "dismiss" || x.type === "cancel") {
    Linking.removeAllListeners("url");
    cb({ [x.type]: true });
  }
};

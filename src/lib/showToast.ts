import Toast from "react-native-toast-message";

export const showToast = (message1, type = "info", message2 = "") => {
  console.log("showToast: ", message1);

  Toast.show({
    type,
    text1: message1,
    text2: message2,
    position: "bottom",
    bottomOffset: 20,
  });
};

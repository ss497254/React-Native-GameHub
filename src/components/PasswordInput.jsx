import React, { useState } from "react";
import { TextInput } from "react-native-paper";

export const PasswordInput = ({ ...props }) => {
  const [secure, setSecure] = useState(true);
  return (
    <TextInput
      {...props}
      secureTextEntry={secure}
      right={
        <TextInput.Icon
          icon={secure ? "eye" : "eye-off"}
          onPress={() => setSecure(!secure)}
        />
      }
    />
  );
};

import React, { memo, useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { apiBaseUrl } from "../../constants";
import { colors } from "../../constants/appStyle";
import { Oauth } from "../../lib/Oauth";
import { showToast } from "../../lib/showToast";
import { useUserStore } from "../../stores/useUserStore";

export const AppleButton = memo(() => {
  const [enabled, setEnabled] = useState(false);
  const queryResult = useQuery("/apple-auth-url?type=app", {
    enabled: enabled,
  });
  const setUser = useUserStore((s) => s.setUser);

  const cb = async ({ url, cancel, dismiss }) => {
    setEnabled(false);
    if (cancel || dismiss || !url) return;

    const code = url.split("?code=")[1];

    const res = await fetch(
      apiBaseUrl + "/apple-callback?type=app&code=" + code
    );
    const data = await res.json();

    if (data && data.user && data.user.userId) {
      setUser(data);
      showToast("Login successfully", "success");
    } else {
      showToast("Unable to Login", "error");
      closeModal();
    }
  };

  useEffect(() => {
    if (!(queryResult.data && enabled)) return;

    const { data } = queryResult;

    if (data && data.url) {
      Oauth(data.url, cb);
    }
  }, [enabled, queryResult.isSuccess]);

  useEffect(() => {
    if (!queryResult.isLoading) setEnabled(false);
  }, [queryResult.isLoading]);

  return (
    <Button
      contentStyle={{
        height: 45,
        backgroundColor: colors["gray-900"],
      }}
      icon="apple"
      loading={enabled}
      onPress={() => setEnabled(true)}
      labelStyle={{
        fontSize: 20,
        color: colors.text,
        marginLeft: 20,
      }}
    >
      <Text style={{ fontSize: 17, color: colors.text }}>
        Continue with Apple{"   "}
      </Text>
    </Button>
  );
});

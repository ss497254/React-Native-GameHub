import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { btoa } from "../lib/base64";
import { Oauth } from "../lib/Oauth";
import { useUserStore } from "../stores/useUserStore";

export const useFitbitAuthWindow = (cb = () => {}) => {
  const { user, fetchUser } = useUserStore((s) => s);
  const [open, setOpen] = useState(false);
  let fitbitAuthWindow = {};

  const queryResult = useQuery(`/fitbit-auth-url?state=${btoa(user.userId)}`, {
    enabled: open,
    staleTime: 600 * 1000,
  });

  const callback = (p) => {
    console.log(p);
    setOpen(false);
    fetchUser();
    cb && cb();
  };

  useEffect(() => {
    if (!queryResult.data || !open) return;

    const { url } = queryResult.data;

    if (url) {
      fitbitAuthWindow = Oauth(url, callback);
    }
  }, [open, queryResult.isSuccess]);

  return [open, setOpen];
};

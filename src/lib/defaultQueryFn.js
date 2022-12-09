import { apiBaseUrl } from "../constants";
import { useIsConnected } from "../stores/useIsConnected";

export const defaultQueryFn = async ({ queryKey }) => {
  const { connected } = useIsConnected.getState();

  if (!connected) throw new Error("You're offline");

  const r = await fetch(`${apiBaseUrl}${queryKey}`, {
    credentials: "include",
  });

  const contentType = r.headers.get("content-type");

  if (r.status !== 200) {
    let x;
    if (contentType?.includes("json")) {
      x = await r.json();
    } else if (contentType?.includes("html")) {
      throw new Error("Some error occurred");
    } else {
      throw new Error(await r.text());
    }

    if (x.data) x = x.data;
    if (x.message) x = x.message;
    if (typeof x === "object") throw new Error(JSON.stringify(x));
    throw new Error(x);
  }

  if (contentType?.includes("json")) return await r.json();
  else return await r.text();
};

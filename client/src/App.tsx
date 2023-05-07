import React, { useCallback, useState } from "react";
import "./App.css";

const urlB64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const NOTIFICATION_PUBLIC_VAPID_KEY = (window as any)
  .NOTIFICATION_PUBLIC_VAPID_KEY;
const API_ENDPOINT = (window as any).API_ENDPOINT;

function App() {
  const [username, setUsername] = useState("");

  const register = useCallback(async () => {
    if (!username) {
      console.log("No username");
      return;
    }
    await navigator.serviceWorker.register("./serviceWorker.js");
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = (
      await registration?.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(NOTIFICATION_PUBLIC_VAPID_KEY),
      })
    )?.toJSON();
    if (!subscription) {
      console.log("No subscription");
      return;
    }
    fetch(`${API_ENDPOINT}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      }),
    }).catch(console.error);
  }, [username]);

  const send = useCallback(() => {
    if (!username) {
      return;
    }
    fetch(`${API_ENDPOINT}/notify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    }).catch(console.error);
  }, [username]);

  return (
    <div className="App">
      <input
        placeholder="username"
        width={200}
        onChange={(ev) => setUsername(ev.target.value)}
        value={username}
      />
      <button onClick={register} disabled={!username}>
        register
      </button>
      <button onClick={() => setTimeout(send, 3000)} disabled={!username}>
        send
      </button>
    </div>
  );
}

export default App;

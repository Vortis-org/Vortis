import React from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

export default function Login() {
  const [tonConnectUI, setOptions] = useTonConnectUI();

  return (
    <div>
      Login
      <button onClick={() => tonConnectUI.openModal()}>Connect Wallet</button>
    </div>
  );
}

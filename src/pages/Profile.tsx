import { useTonConnectUI } from "@tonconnect/ui-react";

export default function Profile() {
  const [tonConnectUI] = useTonConnectUI();

  const handleWalletDisconnect = async () => {
    await tonConnectUI.disconnect();
  };
  return (
    <div>
      <button onClick={handleWalletDisconnect}>Disconnect Wallet</button>
    </div>
  );
}

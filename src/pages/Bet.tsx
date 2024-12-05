import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  useTonConnectUI,
  // useTonAddress,
  TonConnectButton,
} from "@tonconnect/ui-react";
import { useToast } from "@/hooks/use-toast";
import { toNano } from "@ton/ton";
import { beginCell } from "@ton/core";
import { Loader2 } from "lucide-react";

export const CONTRACT_ADDRESS =
  "EQBb_tnQy8fQbmqVjq2dG6TmsCE_91wTmZ9EUlcCipeR8zIe";

export default function Bet() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [prediction, setPrediction] = useState<"0" | "1">("0");
  // const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tonConnectUI.connected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const payloadCell = beginCell()
        // .storeUint(0x2345, 32) // op code for PlaceBet

        .storeInt(BigInt(id || 0), 64)
        .storeInt(BigInt(prediction), 8)
        .endCell();

      const payloadBoc = payloadCell.toBoc().toString("base64");

      const result = await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 1000000,
        messages: [
          {
            address: CONTRACT_ADDRESS,
            amount: toNano(amount).toString(),
            payload: payloadBoc,
          },
        ],
      });

      console.log("Transaction result:", result);

      toast({
        title: "Success",
        description: "Bet placed successfully!",
      });

      // Reset form
      setAmount("");
      setPrediction("0");
    } catch (error) {
      console.error("Error placing bet:", error);
      toast({
        title: "Error",
        description: "Failed to place bet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="border-black border-4 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-brice-semibold text-2xl">Place Your Bet</h1>
            <TonConnectButton />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-medium">Amount (TON)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border-2 border-black rounded-xl"
                placeholder="0.1"
                step="0.1"
                min="0.1"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Your Prediction</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPrediction("0")}
                  className={`p-3 border-2 border-black rounded-xl font-medium ${
                    prediction === "0" ? "bg-[#99ff88]" : "bg-white"
                  }`}
                  disabled={loading}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setPrediction("1")}
                  className={`p-3 border-2 border-black rounded-xl font-medium ${
                    prediction === "1" ? "bg-[#ff6961]" : "bg-white"
                  }`}
                  disabled={loading}
                >
                  No
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              className="mt-4 w-full bg-[#99ff88] text-black py-4 px-6 rounded-xl border-black border-2 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !tonConnectUI.connected}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Bet...
                </div>
              ) : (
                "Place Bet"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
